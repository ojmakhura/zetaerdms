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
import java.io.File;
import java.util.Collection;
import java.util.Set;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * @see bw.co.roguesystems.zetaedrms.document.DocumentService
 */
@Service("documentService")
@Transactional(propagation = Propagation.REQUIRED, readOnly=false)
public class DocumentServiceImpl
    extends DocumentServiceBase
{
    public DocumentServiceImpl(
        DocumentDao documentDao,
        DocumentRepository documentRepository,
        MessageSource messageSource
    ) {
        
        super(
            documentDao,
            documentRepository,
            messageSource
        );
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#findById(String)
     */
    @Override
    protected DocumentDTO handleFindById(String id)
        throws Exception
    {
        Document doc = documentRepository.findById(id).get();

        return documentDao.toDocumentDTO(doc);
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#save(DocumentDTO)
     */
    @Override
    protected DocumentDTO handleSave(DocumentDTO document)
        throws Exception
    {

        Document doc = documentDao.documentDTOToEntity(document);

        doc = documentRepository.save(doc);

        return documentDao.toDocumentDTO(doc);
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#remove(String)
     */
    @Override
    protected boolean handleRemove(String id)
        throws Exception
    {
        // TODO implement protected  boolean handleRemove(String id)
        throw new UnsupportedOperationException("bw.co.roguesystems.zetaedrms.document.DocumentService.handleRemove(String id) Not implemented!");
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#getAll()
     */
    @Override
    protected Collection<DocumentDTO> handleGetAll()
        throws Exception
    {
        // TODO implement protected  Collection<DocumentDTO> handleGetAll()
        throw new UnsupportedOperationException("bw.co.roguesystems.zetaedrms.document.DocumentService.handleGetAll() Not implemented!");
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#search(String, Set<PropertySearchOrder>)
     */
    @Override
    protected Collection<DocumentDTO> handleSearch(String criteria, Set<PropertySearchOrder> orderings)
        throws Exception
    {
        // TODO implement protected  Collection<DocumentDTO> handleSearch(String criteria, Set<PropertySearchOrder> orderings)
        throw new UnsupportedOperationException("bw.co.roguesystems.zetaedrms.document.DocumentService.handleSearch(String criteria, Set<PropertySearchOrder> orderings) Not implemented!");
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#getAll(Integer, Integer)
     */
    @Override
    protected Page<DocumentDTO> handleGetAll(Integer pageNumber, Integer pageSize)
        throws Exception
    {
        // TODO implement protected  Page<DocumentDTO> handleGetAll(Integer pageNumber, Integer pageSize)
        throw new UnsupportedOperationException("bw.co.roguesystems.zetaedrms.document.DocumentService.handleGetAll(Integer pageNumber, Integer pageSize) Not implemented!");
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#search(SearchObject<String>)
     */
    @Override
    protected Page<DocumentDTO> handleSearch(SearchObject<String> criteria)
        throws Exception
    {
        // TODO implement protected  Page<DocumentDTO> handleSearch(SearchObject<String> criteria)
        throw new UnsupportedOperationException("bw.co.roguesystems.zetaedrms.document.DocumentService.handleSearch(SearchObject<String> criteria) Not implemented!");
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.DocumentService#upload(File)
     */
    @Override
    protected Collection<DocumentDTO> handleUpload(Set<File> file)
        throws Exception
    {
        // TODO implement protected  DocumentDTO handleUpload(File file)
        throw new UnsupportedOperationException("bw.co.roguesystems.zetaedrms.document.DocumentService.handleUpload(File file) Not implemented!");
    }

}