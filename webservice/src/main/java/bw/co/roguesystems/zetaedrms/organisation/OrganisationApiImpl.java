// license-header java merge-point
//
// Attention: Generated code! Do not modify by hand!
// Generated by SpringWSImpl.java.vsl in andromda-webservices.
//
package bw.co.roguesystems.zetaedrms.organisation;

import bw.co.roguesystems.zetaedrms.PropertySearchOrder;
import bw.co.roguesystems.zetaedrms.SearchObject;
import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.postgresql.util.PSQLException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/organisation")
@CrossOrigin()
public class OrganisationApiImpl extends OrganisationApiBase {
    
    public OrganisationApiImpl(
            OrganisationService organisationService) {

        super(
                organisationService);
    }

    @Override
    public ResponseEntity<?> handleFindById(String id) {
        try {
            Optional<?> data = Optional.of(organisationService.findById(id)); // TODO: Add custom code here;
            ResponseEntity<?> response;

            if (data.isPresent()) {
                response = ResponseEntity.status(HttpStatus.OK).body(data.get());
            } else {
                response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return response;
        } catch (Exception e) {
            logger.error(e.getMessage());
            String message = e.getMessage();
            if (e instanceof NoSuchElementException || e.getCause() instanceof NoSuchElementException
                    || e instanceof EntityNotFoundException || e.getCause() instanceof EntityNotFoundException) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(String.format("Organisation with id %s not found.", id));
            } else {
                message = "Unknown error encountered. Please contact administrator.";
            }

            logger.error(message);
            return ResponseEntity.badRequest().body(message);
        }
    }

    @Override
    public ResponseEntity<?> handleGetAll() {
        try {
            Optional<?> data = Optional.of(organisationService.getAll()); // TODO: Add custom code here;
            ResponseEntity<?> response;

            if (data.isPresent()) {
                response = ResponseEntity.status(HttpStatus.OK).body(data.get());
            } else {
                response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return response;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> handleGetAllPaged(Integer pageNumber, Integer pageSize) {
        try {
            Optional<?> data = Optional.of(organisationService.getAll(pageNumber, pageSize)); // TODO: Add custom code
                                                                                              // here;
            ResponseEntity<?> response;

            if (data.isPresent()) {
                response = ResponseEntity.status(HttpStatus.OK).body(data.get());
            } else {
                response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return response;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> handlePagedSearch(SearchObject<OrganisationListDTO> criteria) {
        try {
            Optional<?> data = Optional.of(organisationService.search(criteria)); // TODO: Add custom code here;
            ResponseEntity<?> response;

            if (data.isPresent()) {
                response = ResponseEntity.status(HttpStatus.OK).body(data.get());
            } else {
                response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return response;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> handleRemove(String id) {
        try {
            Optional<?> data = Optional.of(organisationService.remove(id)); // TODO: Add custom code here;
            ResponseEntity<?> response;

            if (data.isPresent()) {
                response = ResponseEntity.status(HttpStatus.OK).body(data.get());
            } else {
                response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return response;
        } catch (Exception e) {
            logger.error(e.getMessage());

            if (e instanceof EmptyResultDataAccessException || e.getCause() instanceof EmptyResultDataAccessException) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Could not delete organisation with id " + id);

            } else if (e.getMessage().contains("is in use") || e.getCause().getMessage().contains("is in use")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("This organisation is in use and cannot be deleted.");
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> handleSave(OrganisationDTO organisation) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Jwt jwt = (Jwt) authentication.getPrincipal();

            String username = jwt.getClaimAsString("preferred_username");

            if (StringUtils.isBlank(organisation.getId())) {
                organisation.setCreatedBy(username);
                organisation.setCreatedAt(LocalDateTime.now());
            } else {
                organisation.setModifiedBy(username);
                organisation.setModifiedAt(LocalDateTime.now());
            }

            Optional<?> data = Optional.of(organisationService.save(organisation)); // TODO: Add custom code here;
            ResponseEntity<?> response;

            if (data.isPresent()) {
                response = ResponseEntity.status(HttpStatus.OK).body(data.get());
            } else {
                response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return response;
        } catch (IllegalArgumentException | OrganisationServiceException e) {

            String message = e.getMessage();

            if (e instanceof IllegalArgumentException || e.getCause() instanceof IllegalArgumentException) {

                if (message.contains("'code'")) {

                    message = "Organisation code is missing.";

                } else if (message.contains("'organisation.code' can not be null")) {

                    message = "Organisation code should not be null.";

                } else if (message.contains("'organisation.name' can not be null")) {

                    message = "Organisation name should not be null.";

                } else {
                    message = "Unknown error encountered. Please contact administrator.";
                }

                return ResponseEntity.badRequest().body(message);

            } else if (e.getCause() instanceof PSQLException) {

                if (e.getCause().getMessage().contains("duplicate key")) {
                    if (e.getCause().getMessage().contains("(code)")) {

                        return ResponseEntity.badRequest().body(
                                "Organisation with for this code has already been created. Please edit it instead.");
                    } else if (e.getCause().getMessage().contains("(name)")) {

                        return ResponseEntity.badRequest().body(
                                "Organisation with for this name has already been created. Please edit it instead.");
                    }
                } else if (e.getCause().getMessage().contains("null value in column")) {

                    if (e.getCause().getMessage().contains("column \"created_by\"")) {
                        return ResponseEntity.badRequest().body("The created-by value is missing.");
                    } else if (e.getCause().getMessage().contains("column \"created_date\"")) {
                        return ResponseEntity.badRequest().body("The created date value is missing.");
                    }
                }

                return ResponseEntity.badRequest()
                        .body("An unknown database error has occured. Please contact the administrator.");
            }

            return ResponseEntity.badRequest().body("Unknown error encountered. Please contact administrator.");

        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> handleSearch(SearchObject<OrganisationListDTO> criteria) {
        try {

            Set<PropertySearchOrder> sortings = new HashSet<>();

            if (criteria != null && criteria.getSortings() != null) {
                sortings.addAll(criteria.getSortings());
            }
            Optional<?> data = Optional.of(organisationService.search(criteria.getCriteria(), sortings)); // TODO: Add
                                                                                                          // custom code
                                                                                                          // here;
            ResponseEntity<?> response;

            if (data.isPresent()) {
                response = ResponseEntity.status(HttpStatus.OK).body(data.get());
            } else {
                response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return response;
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}