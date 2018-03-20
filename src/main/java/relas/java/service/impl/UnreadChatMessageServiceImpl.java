package relas.java.service.impl;

import relas.java.service.UnreadChatMessageService;
import relas.java.domain.UnreadChatMessage;
import relas.java.repository.UnreadChatMessageRepository;
import relas.java.repository.search.UnreadChatMessageSearchRepository;
import relas.java.service.dto.UnreadChatMessageDTO;
import relas.java.service.mapper.UnreadChatMessageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing UnreadChatMessage.
 */
@Service
@Transactional
public class UnreadChatMessageServiceImpl implements UnreadChatMessageService {

    private final Logger log = LoggerFactory.getLogger(UnreadChatMessageServiceImpl.class);

    private final UnreadChatMessageRepository unreadChatMessageRepository;

    private final UnreadChatMessageMapper unreadChatMessageMapper;

    private final UnreadChatMessageSearchRepository unreadChatMessageSearchRepository;

    public UnreadChatMessageServiceImpl(UnreadChatMessageRepository unreadChatMessageRepository, UnreadChatMessageMapper unreadChatMessageMapper, UnreadChatMessageSearchRepository unreadChatMessageSearchRepository) {
        this.unreadChatMessageRepository = unreadChatMessageRepository;
        this.unreadChatMessageMapper = unreadChatMessageMapper;
        this.unreadChatMessageSearchRepository = unreadChatMessageSearchRepository;
    }

    /**
     * Save a unreadChatMessage.
     *
     * @param unreadChatMessageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UnreadChatMessageDTO save(UnreadChatMessageDTO unreadChatMessageDTO) {
        log.debug("Request to save UnreadChatMessage : {}", unreadChatMessageDTO);
        UnreadChatMessage unreadChatMessage = unreadChatMessageMapper.toEntity(unreadChatMessageDTO);
        unreadChatMessage = unreadChatMessageRepository.save(unreadChatMessage);
        UnreadChatMessageDTO result = unreadChatMessageMapper.toDto(unreadChatMessage);
        unreadChatMessageSearchRepository.save(unreadChatMessage);
        return result;
    }

    /**
     * Get all the unreadChatMessages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UnreadChatMessageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UnreadChatMessages");
        return unreadChatMessageRepository.findAll(pageable)
            .map(unreadChatMessageMapper::toDto);
    }

    /**
     * Get one unreadChatMessage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UnreadChatMessageDTO findOne(Long id) {
        log.debug("Request to get UnreadChatMessage : {}", id);
        UnreadChatMessage unreadChatMessage = unreadChatMessageRepository.findOne(id);
        return unreadChatMessageMapper.toDto(unreadChatMessage);
    }

    /**
     * Delete the unreadChatMessage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UnreadChatMessage : {}", id);
        unreadChatMessageRepository.delete(id);
        unreadChatMessageSearchRepository.delete(id);
    }

    /**
     * Search for the unreadChatMessage corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UnreadChatMessageDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of UnreadChatMessages for query {}", query);
        Page<UnreadChatMessage> result = unreadChatMessageSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(unreadChatMessageMapper::toDto);
    }
}
