// Generated by hibernate/SpringHibernateDaoImpl.vsl in andromda-spring-cartridge on $springUtils.date.
// license-header java merge-point
/**
 * This is only generated once! It will never be overwritten.
 * You can (and have to!) safely modify it by hand.
 */
package bw.co.roguesystems.zetaedrms.document;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

/**
 * @see Document
 */
@Repository("documentDao")
public class DocumentDaoImpl
    extends DocumentDaoBase
{
    
    public DocumentDaoImpl(
        DocumentRepository documentRepository
    ) {

        super(
            documentRepository
        );
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void toDocumentDTO(
        Document source,
        DocumentDTO target)
    {
        // TODO verify behavior of toDocumentDTO
        super.toDocumentDTO(source, target);
        // WARNING! No conversion for target.metadata (can't convert source.getMetadata():java.util.Map to java.util.Map<K, V>
        target.setMetadata(source.getMetadata());

        if(source.getParent() != null) {
            DocumentDTO dto = new DocumentDTO();

            dto.setDir(source.getParent().getDir());
            dto.setId(source.getParent().getId());
            dto.setDocumentName(source.getParent().getDocumentName());
            dto.setContentType(source.getParent().getContentType());
            dto.setCreatedAt(source.getParent().getCreatedAt());
            dto.setCreatedBy(source.getParent().getCreatedBy());
            dto.setModifiedAt(source.getParent().getModifiedAt());
            dto.setModifiedBy(source.getParent().getModifiedBy());
            dto.setFilePath(source.getParent().getFilePath());

            target.setParent(dto);
        }

        if(CollectionUtils.isNotEmpty(source.getDocuments())) {

            target.setDirectories(new ArrayList<>());
            target.setFiles(new ArrayList<>());

            for (Document document : source.getDocuments()) {
                DocumentDTO dto = new DocumentDTO();
                this.toDocumentDTO(document, dto);

                if(dto.getDir()) {
                    target.getDirectories().add(dto);
                } else {
                    target.getFiles().add(dto);
                }
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public DocumentDTO toDocumentDTO(final Document entity)
    {
        // TODO verify behavior of toDocumentDTO
        return super.toDocumentDTO(entity);
    }

    /**
     * Retrieves the entity object that is associated with the specified value object
     * from the object store. If no such entity object exists in the object store,
     * a new, blank entity is created
     */
    private Document loadDocumentFromDocumentDTO(DocumentDTO documentDTO)
    {
        if (documentDTO.getId() == null)
        {
            return  Document.Factory.newInstance();
        }
        else
        {
            return this.documentRepository.getReferenceById(documentDTO.getId());
        }
    }

    /**
     * {@inheritDoc}
     */
    public Document documentDTOToEntity(DocumentDTO documentDTO)
    {
        // TODO verify behavior of documentDTOToEntity
        Document entity = this.loadDocumentFromDocumentDTO(documentDTO);
        this.documentDTOToEntity(documentDTO, entity, true);
        return entity;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void documentDTOToEntity(
        DocumentDTO source,
        Document target,
        boolean copyIfNull)
    {
        // TODO verify behavior of documentDTOToEntity
        super.documentDTOToEntity(source, target, copyIfNull);
        // No conversion for target.metadata (can't convert source.getMetadata():java.util.Map<K, V> to java.util.Map
        target.setMetadata(source.getMetadata());

        if(source.getDir()) {

            target.setDir(source.getDir());
            target.setContentType("DIR");
        }

        if(source.getParent() != null) {
            Document parent = this.loadDocumentFromDocumentDTO(source.getParent());
            target.setParent(parent);
        }
    }
}