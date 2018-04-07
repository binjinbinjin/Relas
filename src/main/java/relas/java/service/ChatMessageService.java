package relas.java.service;

import relas.java.domain.ChatMessage;
import relas.java.service.dto.ChatMessageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.validation.constraints.NotNull;

/**
 * Service Interface for managing ChatMessage.
 */
public interface ChatMessageService {

    /**
     * Save a chatMessage.
     *
     * @param chatMessageDTO the entity to save
     * @return the persisted entity
     */
    ChatMessageDTO save(ChatMessageDTO chatMessageDTO);

    /**
     * Get all the chatMessages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ChatMessageDTO> findAll(Pageable pageable);

    /**
     * Get the "id" chatMessage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ChatMessageDTO findOne(Long id);

    /**
     * Delete the "id" chatMessage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the chatMessage corresponding to the query.
     *
     * @param query the query of the search
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ChatMessageDTO> search(String query, Pageable pageable);

    /**
     * Convert ChatMessage to ChatMessageDTO
     *
     * @param message chat message
     * @return correspond ChatMessageDTO object
     * */
    ChatMessageDTO convertEntityToDTO(@NotNull ChatMessage message);

    /**
     * Convert ChatMessageDTO to ChatMessage
     *
     * @param messageDTO chat message
     * @return correspond ChatMessage object
     * */
    ChatMessage convertDTOToEntity(@NotNull ChatMessageDTO messageDTO);
}
