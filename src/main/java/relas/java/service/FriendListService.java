package relas.java.service;

import relas.java.service.dto.FriendListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing FriendList.
 */
public interface FriendListService {

    /**
     * Save a friendList.
     *
     * @param friendListDTO the entity to save
     * @return the persisted entity
     */
    FriendListDTO save(FriendListDTO friendListDTO);

    /**
     * Check if  user A  already in friendship with B
     * @param friendLogin user B's login
     * @param userLogin user A's login
     * @return true is A and B are friend
     * */
    public boolean friendshipCheck(String friendLogin, String userLogin);

    /**
     * Get all the friendLists.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FriendListDTO> findAll(Pageable pageable);

    /**
     * Get the "id" friendList.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FriendListDTO findOne(Long id);

    /**
     * Delete the "id" friendList.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the friendList corresponding to the query.
     *
     * @param query the query of the search
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FriendListDTO> search(String query, Pageable pageable);
}
