package relas.java.service;

import relas.java.service.dto.IntroduceUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing IntroduceUser.
 */
public interface IntroduceUserService {

    /**
     * Save a introduceUser.
     *
     * @param introduceUserDTO the entity to save
     * @return the persisted entity
     */
    IntroduceUserDTO save(IntroduceUserDTO introduceUserDTO);

    /**
     * Get all the introduceUsers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<IntroduceUserDTO> findAll(Pageable pageable);

    /**
     * Get the "id" introduceUser.
     *
     * @param id the id of the entity
     * @return the entity
     */
    IntroduceUserDTO findOne(Long id);

    /**
     * Delete the "id" introduceUser.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the introduceUser corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<IntroduceUserDTO> search(String query, Pageable pageable);
}
