// license-header java merge-point
/**
 * This is only generated once! It will never be overwritten.
 * You can (and have to!) safely modify it by hand.
 * TEMPLATE:    SpringServiceImpl.vsl in andromda-spring cartridge
 * MODEL CLASS: ZetaEDRMS::backend::bw.co.roguesystems.zetaedrms::organisation::department::DepartmentService
 * STEREOTYPE:  Service
 */
package bw.co.roguesystems.zetaedrms.organisation.department;

import bw.co.roguesystems.zetaedrms.PageableFactory;
import bw.co.roguesystems.zetaedrms.PropertySearchOrder;
import bw.co.roguesystems.zetaedrms.SearchObject;
import bw.co.roguesystems.zetaedrms.config.CacheManagement;

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
 * @see bw.co.roguesystems.zetaedrms.organisation.department.DepartmentService
 */
@Service("departmentService")
@Transactional(propagation = Propagation.REQUIRED, readOnly=false)
public class DepartmentServiceImpl
    extends DepartmentServiceBase
{

    // private final CacheManagement cacheManagement;

    public DepartmentServiceImpl(
            DepartmentDao departmentDao,
            DepartmentRepository departmentRepository,
            // CacheManagement cacheManagement,
            MessageSource messageSource) {

        super(
                departmentDao,
                departmentRepository,
                messageSource);

        // this.cacheManagement = cacheManagement;
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.department.DepartmentService#findById(Long)
     */
    @Override
    protected DepartmentDTO handleFindById(String id)
            throws Exception {

        return departmentDao.toDepartmentDTO(departmentRepository.findById(id).orElse(null));
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.department.DepartmentService#getAll()
     */
    @Override
    protected Collection<DepartmentListDTO> handleGetAll()
            throws Exception {

        return departmentRepository.search(null, null, null, null);
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.department.DepartmentService#getAll(Integer,
     *      Integer)
     */
    @Override
    protected Page<DepartmentListDTO> handleGetAll(Integer pageNumber, Integer pageSize)
            throws Exception {

        return departmentRepository.search(null, null, null, null, PageRequest.of(pageNumber, pageSize));
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.department.DepartmentService#remove(Long)
     */
    @Override
    protected boolean handleRemove(String id)
            throws Exception {

        departmentRepository.deleteById(id);
        return true;
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.department.DepartmentService#save(DepartmentDTO)
     */
    @Override
    protected DepartmentDTO handleSave(DepartmentDTO office)
            throws Exception {

        Department entity = departmentDao.departmentDTOToEntity(office);
        entity = departmentRepository.save(entity);
        DepartmentDTO dto = departmentDao.toDepartmentDTO(entity);

        Map<String, Object> evictions = new HashMap<>();
        evictions.put("department", null);
        evictions.put("service", null);
        evictions.put("serviceCenter", null);

        // cacheManagement.evict(evictions);
        // cacheManagement.put("department", dto.getId(), dto);

        return departmentDao.toDepartmentDTO(entity);
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.department.DepartmentService#search(SearchObject<DepartmentListDTO>,
     *      Set<PropertySearchOrder>)
     */
    @Override
    protected Collection<DepartmentListDTO> handleSearch(DepartmentListDTO criteria, Set<PropertySearchOrder> orderings)
            throws Exception {

        return departmentRepository.search(
                criteria.getCode() != null ? criteria.getCode() : criteria.getName(),
                criteria.getOrganisationId(),
                criteria.organisation,
                criteria.getStatus());
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.department.DepartmentService#search(SearchObject<DepartmentListDTO>)
     */
    @Override
    protected Page<DepartmentListDTO> handleSearch(SearchObject<DepartmentListDTO> criteria)
            throws Exception {

        DepartmentListDTO tmp = criteria.getCriteria();

        return departmentRepository.search(
                tmp.getCode() != null ? tmp.getCode() : tmp.getName(),
                tmp.getOrganisationId(),
                tmp.organisation,
                tmp.getStatus(),
                PageableFactory.createPageable(criteria.getPageNumber(), criteria.getPageSize(),
                        criteria.getSortings()));
    }

    /**
     * @see bw.co.bitri.cfpso.organisation.department.DepartmentService#getOrganisationDepartments(Long)
     */
    @Override
    protected Collection<DepartmentListDTO> handleGetOrganisationDepartments(String organisationId)
            throws Exception {

        return departmentRepository.searchByOrganisationId(organisationId);
    }

    @Override
    protected Page<DepartmentListDTO> handleGetOrganisationDepartments(String organisationId, Integer pageNumber,
            Integer pageSize) throws Exception {

        return departmentRepository.searchByOrganisationId(organisationId, PageRequest.of(pageNumber, pageSize));
    }


}