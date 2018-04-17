package relas.java.service.impl;

import relas.java.service.ChatRoomService;
import relas.java.domain.ChatRoom;
import relas.java.repository.ChatRoomRepository;
import relas.java.repository.search.ChatRoomSearchRepository;
import relas.java.service.dto.ChatRoomDTO;
import relas.java.service.mapper.ChatRoomMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ChatRoom.
 */
@Service
@Transactional
public class ChatRoomServiceImpl implements ChatRoomService {

    private final Logger log = LoggerFactory.getLogger(ChatRoomServiceImpl.class);

    private final ChatRoomRepository chatRoomRepository;

    private final ChatRoomMapper chatRoomMapper;

    private final ChatRoomSearchRepository chatRoomSearchRepository;

    public ChatRoomServiceImpl(ChatRoomRepository chatRoomRepository, ChatRoomMapper chatRoomMapper, ChatRoomSearchRepository chatRoomSearchRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatRoomMapper = chatRoomMapper;
        this.chatRoomSearchRepository = chatRoomSearchRepository;
    }

    /**
     * Save a chatRoom.
     *
     * @param chatRoomDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ChatRoomDTO save(ChatRoomDTO chatRoomDTO) {
        log.debug("Request to save ChatRoom : {}", chatRoomDTO);
        chatRoomDTO.setChatID(1l);
        ChatRoom chatRoom = chatRoomMapper.toEntity(chatRoomDTO);
        chatRoom = chatRoomRepository.save(chatRoom);
        chatRoom.setChatID(chatRoom.getId());
        chatRoom = chatRoomRepository.save(chatRoom);
        ChatRoomDTO result = chatRoomMapper.toDto(chatRoom);
        chatRoomSearchRepository.save(chatRoom);
        return result;
    }

    /**
     * Get all the chatRooms.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ChatRoomDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ChatRooms");
        return chatRoomRepository.findAll(pageable)
            .map(chatRoomMapper::toDto);
    }

    /**
     * Get one chatRoom by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ChatRoomDTO findOne(Long id) {
        log.debug("Request to get ChatRoom : {}", id);
        ChatRoom chatRoom = chatRoomRepository.findOne(id);
        return chatRoomMapper.toDto(chatRoom);
    }

    /**
     * Delete the chatRoom by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ChatRoom : {}", id);
        chatRoomRepository.delete(id);
        chatRoomSearchRepository.delete(id);
    }

    /**
     * Search for the chatRoom corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ChatRoomDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ChatRooms for query {}", query);
        Page<ChatRoom> result = chatRoomSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(chatRoomMapper::toDto);
    }
}
