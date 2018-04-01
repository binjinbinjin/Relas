package relas.java.service;

import relas.java.service.dto.IntroduceUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

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
     * Save a introduceUser iff no same request exist
     * - the request with different reason and time, but same users will be consider as same request
     *
     * @param introduceUserDTO the entity to save
     * @return the persisted entity if no same request exist, null other
     */
    IntroduceUserDTO saveIfNotExist(IntroduceUserDTO introduceUserDTO);


    /**
     * Remove introduceUser Entities
     *
     * This method will remove all the entities that try to get introduceToUser and introduceUser
     * into friendship.
     *
     *
     * @param introduceUser login of user want to add
     * @param introduceToUser login of user who wants to add introduceUser
     */
    void removeIntroduceUser(String introduceToUser, String introduceUser);

    /**
     * Save a introduceUser.
     *
     * @param login user login
     * @return a list of request
     */
    List<IntroduceUserDTO> findByIntroduceUserID_Login(String login);
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
