// license-header java merge-point
/**
 * This is only generated once! It will never be overwritten.
 * You can (and have to!) safely modify it by hand.
 * TEMPLATE:    SpringServiceImpl.vsl in andromda-spring cartridge
 * MODEL CLASS: ZetaEDRMS::backend::bw.co.roguesystems.zetaedrms::document::DocumentService
 * STEREOTYPE:  Service
 */
package bw.co.roguesystems.zetaedrms.document;

import bw.co.roguesystems.zetaedrms.PropertySearchOrder;
import bw.co.roguesystems.zetaedrms.SearchObject;
import bw.co.roguesystems.zetaedrms.minio.MinioService;
import io.minio.PutObjectArgs;
import io.minio.Result;
import io.minio.messages.Item;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * @see bw.co.roguesystems.zetaedrms.document.DocumentService
 */
@Service("documentService")
@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
public class DocumentServiceImpl
        extends DocumentServiceBase {

    private final MinioService minioService;

    public DocumentServiceImpl(
            DocumentDao documentDao,
            DocumentRepository documentRepository,
            MinioService minioService,
            MessageSource messageSource) {

        super(
                documentDao,
                documentRepository,
                messageSource);

        this.minioService = minioService;
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#findById(String)
     */
    @Override
    protected DocumentDTO handleFindById(String id)
            throws Exception {
        Document doc = documentRepository.findById(id).get();

        return documentDao.toDocumentDTO(doc);
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#save(DocumentDTO)
     */
    @Override
    protected DocumentDTO handleSave(DocumentDTO document)
            throws Exception {

        if(StringUtils.isBlank(document.getId())) {
            document.setDocumentId(UUID.randomUUID().toString());
        }

        if(StringUtils.isBlank(document.version)) {
            document.setVersion("0.1");
        }

        Document doc = documentDao.documentDTOToEntity(document);
        doc = documentRepository.save(doc);

        return documentDao.toDocumentDTO(doc);
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#remove(String)
     */
    @Override
    protected boolean handleRemove(String id)
            throws Exception {

        documentRepository.deleteById(id);

        return true;
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#getAll()
     */
    @Override
    protected Collection<DocumentDTO> handleGetAll()
            throws Exception {

        Collection<Document> docs = documentRepository.findAll();

        return documentDao.toDocumentDTOCollection(docs);
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#search(String,
     *      Set<PropertySearchOrder>)
     */
    @Override
    protected Collection<DocumentDTO> handleSearch(String criteria, Set<PropertySearchOrder> orderings)
            throws Exception {
        throw new UnsupportedOperationException(
                "bw.co.roguesystems.zetaedrms.document.DocumentService.handleSearch(String criteria, Set<PropertySearchOrder> orderings) Not implemented!");
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#getAll(Integer,
     *      Integer)
     */
    @Override
    protected Page<DocumentDTO> handleGetAll(Integer pageNumber, Integer pageSize)
            throws Exception {

        Page<Document> docs = documentRepository.findAll(PageRequest.of(pageNumber, pageSize));

        return docs.map(documentDao::toDocumentDTO);
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#search(SearchObject<String>)
     */
    @Override
    protected Page<DocumentDTO> handleSearch(SearchObject<String> criteria)
            throws Exception {
        // TODO implement protected Page<DocumentDTO> handleSearch(SearchObject<String>
        // criteria)
        throw new UnsupportedOperationException(
                "bw.co.roguesystems.zetaedrms.document.DocumentService.handleSearch(SearchObject<String> criteria) Not implemented!");
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#upload(File)
     */
    @Override
    protected Collection<DocumentDTO> handleUpload(String baseDir, String owner, Set<MultipartFile> files)
            throws Exception {

        String id = null;
        // try (InputStream fis = file.getInputStream()) {

        // id = minioService.putObject(
        // PutObjectArgs.builder()
        // .bucket(bucketName)
        // .object(fileName)
        // .stream(inputStream, file.getSize(), -1)
        // .contentType(file.getContentType())
        // .build());

        // System.out.println("DICOM file uploaded to MinIO: " + dicomFile.getName());
        // }

        // return null;

        List<Document> docs = new ArrayList<>();

        Document parent = documentRepository.findByFilePath(baseDir);

        for (MultipartFile file : files) {
            String fileName = baseDir + "/" + file.getOriginalFilename();
            try (InputStream inputStream = file.getInputStream()) {
                
                id = minioService.uploadFile(fileName, inputStream, file.getSize(), file.getContentType());
                System.out.println("File uploaded to MinIO: " + id);

                Document doc = Document.Factory.newInstance();
                doc.setFilePath(fileName);
                doc.setCreatedBy(owner);
                doc.setCreatedAt(LocalDateTime.now());
                doc.setContentType(file.getContentType());
                doc.setDocumentName(file.getOriginalFilename());
                doc.setVersion("0.0.1");
                doc.setDocumentId(UUID.randomUUID().toString());
                doc.setParent(parent);

//                docs.add(doc);

            } catch(Exception e) {
                e.printStackTrace();
                throw new DocumentServiceException("Error uploading file: " + file.getOriginalFilename());
            }
        }

        docs = documentRepository.saveAll(docs);

        return documentDao.toDocumentDTOCollection(docs);
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#upload(File)
     */
    @Override
    protected Collection<DocumentDTO> handleGetFileList(String directory)
            throws Exception {

        Document doc = documentRepository.findByFilePath(directory);
        List<DocumentDTO> docs = new ArrayList<>();

        if(CollectionUtils.isNotEmpty(doc.getDocuments())) {

            for (Document document : doc.getDocuments()) {
                DocumentDTO dto = new DocumentDTO();
                this.documentDao.toDocumentDTO(document, dto);
                docs.add(dto);
            }
        }
        
        return docs;
    }

    @Override
    protected DocumentDTO handleGetUserRoot(String userId) throws Exception {

        Document doc = documentRepository.findByFilePath("/" + userId);
        if(doc != null) {
            DocumentDTO dto = new DocumentDTO();
            this.documentDao.toDocumentDTO(doc, dto);
            return dto;
        }

        return null;
    }
}