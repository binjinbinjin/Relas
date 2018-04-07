package relas.java.service.impl;

import relas.java.service.ChatRoomMemberService;
import relas.java.domain.ChatRoomMember;
import relas.java.repository.ChatRoomMemberRepository;
import relas.java.repository.search.ChatRoomMemberSearchRepository;
import relas.java.service.dto.ChatRoomMemberDTO;
import relas.java.service.mapper.ChatRoomMemberMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ChatRoomMember.
 */
@Service
@Transactional
public class ChatRoomMemberServiceImpl implements ChatRoomMemberService {

    private final Logger log = LoggerFactory.getLogger(ChatRoomMemberServiceImpl.class);

    private final ChatRoomMemberRepository chatRoomMemberRepository;

    private final ChatRoomMemberMapper chatRoomMemberMapper;

    private final ChatRoomMemberSearchRepository chatRoomMemberSearchRepository;

    public ChatRoomMemberServiceImpl(ChatRoomMemberRepository chatRoomMemberRepository, ChatRoomMemberMapper chatRoomMemberMapper, ChatRoomMemberSearchRepository chatRoomMemberSearchRepository) {
        this.chatRoomMemberRepository = chatRoomMemberRepository;
        this.chatRoomMemberMapper = chatRoomMemberMapper;
        this.chatRoomMemberSearchRepository = chatRoomMemberSearchRepository;
    }

    /**
     * Save a chatRoomMember.
     *
     * @param chatRoomMemberDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ChatRoomMemberDTO save(ChatRoomMemberDTO chatRoomMemberDTO) {
        log.debug("Request to save ChatRoomMember : {}", chatRoomMemberDTO);
        ChatRoomMember chatRoomMember = chatRoomMemberMapper.toEntity(chatRoomMemberDTO);
        chatRoomMember = chatRoomMemberRepository.save(chatRoomMember);
        ChatRoomMemberDTO result = chatRoomMemberMapper.toDto(chatRoomMember);
        chatRoomMemberSearchRepository.save(chatRoomMember);
        return result;
    }

    /**
     * Get a list of chat room member by chat room id
     *
     * @param chatId chat room id
     * @return return a list of chat room member, if this chat room is not empty, otherwise null
     */
    @Override
    public List<ChatRoomMemberDTO> getMembersOfChatRoom(long chatId) {
        Optional<List<ChatRoomMember>> members = this.chatRoomMemberRepository.findChatRoomMemberByChatID_Id(chatId);
        List<ChatRoomMemberDTO> membersResult = null;
        if(members.isPresent())
            membersResult = this.chatRoomMemberMapper.toDto(members.get());
        log.debug("Get chat room members: members {}", members);
        return membersResult;
    }

    /**
     * Get all the chatRoomMembers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ChatRoomMemberDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ChatRoomMembers");
        return chatRoomMemberRepository.findAll(pageable)
            .map(chatRoomMemberMapper::toDto);
    }

    /**
     * Get one chatRoomMember by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ChatRoomMemberDTO findOne(Long id) {
        log.debug("Request to get ChatRoomMember : {}", id);
        ChatRoomMember chatRoomMember = chatRoomMemberRepository.findOne(id);
        return chatRoomMemberMapper.toDto(chatRoomMember);
    }

    /**
     * Delete the chatRoomMember by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ChatRoomMember : {}", id);
        chatRoomMemberRepository.delete(id);
        chatRoomMemberSearchRepository.delete(id);
    }

    /**
     * Search for the chatRoomMember corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ChatRoomMemberDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ChatRoomMembers for query {}", query);
        Page<ChatRoomMember> result = chatRoomMemberSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(chatRoomMemberMapper::toDto);
    }
}
