package bw.co.roguesystems.zetaedrms;

import java.util.Collection;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageableFactory {
    

    public static Pageable createPageable(Integer pageNumber, Integer pageSize, Collection<PropertySearchOrder> orderings) {

        if(pageNumber == null || pageSize == null) {
            return null;
        }
        
        Sort sort = SortOrderFactory.createSortOrder(orderings);
        return sort != null ? PageRequest.of(pageNumber, pageSize, sort) : PageRequest.of(pageNumber, pageSize);
    }

}
