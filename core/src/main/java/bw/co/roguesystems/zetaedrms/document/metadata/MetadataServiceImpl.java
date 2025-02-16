// license-header java merge-point
/**
 * This is only generated once! It will never be overwritten.
 * You can (and have to!) safely modify it by hand.
 * TEMPLATE:    SpringServiceImpl.vsl in andromda-spring cartridge
 * MODEL CLASS: ZetaEDRMS::backend::bw.co.roguesystems.zetaedrms::document::metadata::MetadataService
 * STEREOTYPE:  Service
 */
package bw.co.roguesystems.zetaedrms.document.metadata;

import bw.co.roguesystems.zetaedrms.PropertySearchOrder;
import bw.co.roguesystems.zetaedrms.SearchObject;
import bw.co.roguesystems.zetaedrms.SortOrderFactory;

import java.util.Collection;
import java.util.Set;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * @see bw.co.roguesystems.zetaedrms.document.metadata.MetadataService
 */
@Service("metadataService")
@Transactional(propagation = Propagation.REQUIRED, readOnly=false)
public class MetadataServiceImpl
    extends MetadataServiceBase
{
    public MetadataServiceImpl(
        MetadataDao metadataDao,
        MetadataRepository metadataRepository,
        MessageSource messageSource
    ) {
        
        super(
            metadataDao,
            metadataRepository,
            messageSource
        );
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.metadata.MetadataService#findById(String)
     */
    @Override
    protected MetadataDTO handleFindById(String id)
        throws Exception
    {

        Metadata metadata = this.metadataRepository.findById(id).orElse(null);

        if (metadata == null) {
            return null;
        }

        return this.metadataDao.toMetadataDTO(metadata);
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.metadata.MetadataService#save(MetadataDTO)
     */
    @Override
    protected MetadataDTO handleSave(MetadataDTO metadata)
        throws Exception
    {
        Metadata entity = this.metadataDao.metadataDTOToEntity(metadata);
        entity = this.metadataRepository.save(entity);
        return this.metadataDao.toMetadataDTO(entity);
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.metadata.MetadataService#remove(String)
     */
    @Override
    protected boolean handleRemove(String id)
        throws Exception
    {

        Metadata metadata = this.metadataRepository.findById(id).orElse(null);

        if (metadata == null) {

            throw new MetadataServiceException("Metadata with id " + id + " not found");
        }

        this.metadataRepository.delete(metadata);
        return true;
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.metadata.MetadataService#getAll()
     */
    @Override
    protected Collection<MetadataDTO> handleGetAll()
        throws Exception
    {

        Collection<Metadata> metadata = this.metadataRepository.findAll();
        return this.metadataDao.toMetadataDTOCollection(metadata);
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.metadata.MetadataService#search(String, Set<PropertySearchOrder>)
     */
    @Override
    protected Collection<MetadataDTO> handleSearch(String criteria, Set<PropertySearchOrder> orderings)
        throws Exception
    {

        Collection<Metadata> metadata = this.metadataDao.findByCriteria(criteria);
        return this.metadataDao.toMetadataDTOCollection(metadata);
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.metadata.MetadataService#getAll(Integer, Integer)
     */
    @Override
    protected Page<MetadataDTO> handleGetAll(Integer pageNumber, Integer pageSize)
        throws Exception
    {

        return this.metadataRepository.findAll(PageRequest.of(pageNumber, pageSize)).map(metadata -> this.metadataDao.toMetadataDTO(metadata));
    }

    /**
     * @see bw.co.roguesystems.zetaedrms.document.metadata.MetadataService#search(SearchObject<String>)
     */
    @Override
    protected Page<MetadataDTO> handleSearch(SearchObject<String> criteria)
        throws Exception
    {

        Sort sort = SortOrderFactory.createSortOrder(criteria.getSortings()); 
        Pageable pageable = 
            sort == null ?
            PageRequest.of(criteria.getPageNumber(), criteria.getPageSize()) :
            PageRequest.of(criteria.getPageNumber(), criteria.getPageSize(), sort);

        return this.metadataRepository.findAll(pageable).map(metadata -> this.metadataDao.toMetadataDTO(metadata));
    }

}