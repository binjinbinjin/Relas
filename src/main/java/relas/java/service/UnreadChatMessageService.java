package relas.java.service;

import relas.java.service.dto.UnreadChatMessageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing UnreadChatMessage.
 */
public interface UnreadChatMessageService {

    /**
     * Save a unreadChatMessage.
     *
     * @param unreadChatMessageDTO the entity to save
     * @return the persisted entity
     */
    UnreadChatMessageDTO save(UnreadChatMessageDTO unreadChatMessageDTO);

    /**
     * Get all the unreadChatMessages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<UnreadChatMessageDTO> findAll(Pageable pageable);

    /**
     * Get the "id" unreadChatMessage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UnreadChatMessageDTO findOne(Long id);

    /**
     * Delete the "id" unreadChatMessage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the unreadChatMessage corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<UnreadChatMessageDTO> search(String query, Pageable pageable);
}
