// license-header java merge-point
/**
 * This is only generated once! It will never be overwritten.
 * You can (and have to!) safely modify it by hand.
 * TEMPLATE:    SpringServiceImpl.vsl in andromda-spring cartridge
 * MODEL CLASS: ZetaEDRMS::backend::bw.co.roguesystems.zetaedrms::organisation::OrganisationService
 * STEREOTYPE:  Service
 */
package bw.co.roguesystems.zetaedrms.organisation;

import bw.co.roguesystems.zetaedrms.PageableFactory;
import bw.co.roguesystems.zetaedrms.PropertySearchOrder;
import bw.co.roguesystems.zetaedrms.SearchObject;
// import bw.co.roguesystems.zetaedrms.config.CacheManagement;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * @see bw.co.roguesystems.zetaedrms.organisation.OrganisationService
 */
@Service("organisationService")
@Transactional(propagation = Propagation.REQUIRED, readOnly=false)
public class OrganisationServiceImpl
    extends OrganisationServiceBase
{
    // private final CacheManagement cacheManagement;

    public OrganisationServiceImpl(
            OrganisationDao organisationDao,
            OrganisationRepository organisationRepository,
            // CacheManagement cacheManagement,
            MessageSource messageSource) {

        super(
                organisationDao,
                organisationRepository,
                messageSource);

        // this.cacheManagement = cacheManagement;
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.OrganisationService#findById(Long)
     */
    @Override
    protected OrganisationDTO handleFindById(String id)
            throws Exception {

        if (id == null) {
            return null;
        }
        return this.getOrganisationDao().toOrganisationDTO(this.getOrganisationRepository().getReferenceById(id));
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.OrganisationService#getAll()
     */
    @Override
    protected Collection<OrganisationListDTO> handleGetAll()
            throws Exception {

        return this.getOrganisationDao().toOrganisationListDTOCollection(this.getOrganisationRepository().findAll());
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.OrganisationService#getAll(Integer,
     *      Integer)
     */
    @Override
    protected Page<OrganisationListDTO> handleGetAll(Integer pageNumber, Integer pageSize)
            throws Exception {

        Page<Organisation> organisations = this.getOrganisationRepository()
                .findAll(PageRequest.of(pageNumber, pageSize));

        return organisations.map(this.getOrganisationDao()::toOrganisationListDTO);
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.OrganisationService#remove(Long)
     */
    @Override
    protected boolean handleRemove(String id)
            throws Exception {

        if (id == null) {
            return false;
        }
        this.getOrganisationRepository().deleteById(id);
        return true;
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.OrganisationService#save(OrganisationDTO)
     */
    @Override
    protected OrganisationDTO handleSave(OrganisationDTO organisation)
            throws Exception {

        Organisation entity = organisationDao.organisationDTOToEntity(organisation);
        entity = organisationRepository.saveAndFlush(entity);

        OrganisationDTO dto = organisationDao.toOrganisationDTO(entity);

        Map<String, Object> evictions = new HashMap<>();
        evictions.put("organisation", null);
        evictions.put("department", null);
        evictions.put("service", null);
        evictions.put("serviceCenter", null);

        // cacheManagement.evict(evictions);
        // cacheManagement.put("organisation", dto.getId(), dto);

        return dto;
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.OrganisationService#search(Set<PropertySearchOrder>,
     *      String)
     */
    @Override
    protected Collection<OrganisationListDTO> handleSearch(OrganisationListDTO criteria,
            Set<PropertySearchOrder> orderings)
            throws Exception {

        return organisationRepository.findByCriteria(criteria.getCode(), criteria.getName(),
        criteria.getStatus());
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.OrganisationService#search(SearchObject<String>)
     */
    @Override
    protected Page<OrganisationListDTO> handleSearch(SearchObject<OrganisationListDTO> criteria)
            throws Exception {

        return organisationRepository.findByCriteria(criteria.getCriteria().getCode(), criteria.getCriteria().getName(),
        criteria.getCriteria().getStatus(),
                PageableFactory.createPageable(criteria.getPageNumber(), criteria.getPageSize(),
                        criteria.getSortings()));
    }

}