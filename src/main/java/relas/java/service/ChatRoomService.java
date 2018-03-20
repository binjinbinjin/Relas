package relas.java.service;

import relas.java.service.dto.ChatRoomDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ChatRoom.
 */
public interface ChatRoomService {

    /**
     * Save a chatRoom.
     *
     * @param chatRoomDTO the entity to save
     * @return the persisted entity
     */
    ChatRoomDTO save(ChatRoomDTO chatRoomDTO);

    /**
     * Get all the chatRooms.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ChatRoomDTO> findAll(Pageable pageable);

    /**
     * Get the "id" chatRoom.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ChatRoomDTO findOne(Long id);

    /**
     * Delete the "id" chatRoom.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the chatRoom corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ChatRoomDTO> search(String query, Pageable pageable);
}
