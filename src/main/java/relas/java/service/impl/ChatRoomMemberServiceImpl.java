package relas.java.service.impl;

import relas.java.domain.ChatRoom;
import relas.java.service.ChatRoomMemberService;
import relas.java.domain.ChatRoomMember;
import relas.java.repository.ChatRoomMemberRepository;
import relas.java.repository.search.ChatRoomMemberSearchRepository;
import relas.java.service.ChatRoomService;
import relas.java.service.dto.ChatRoomDTO;
import relas.java.service.dto.ChatRoomMemberDTO;
import relas.java.service.mapper.ChatRoomMapper;
import relas.java.service.mapper.ChatRoomMemberMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import relas.java.web.rest.dto.MemberOfChatRoomDTO;


import java.util.LinkedList;
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

    private final ChatRoomMapper chatRoomMapper;

    public ChatRoomMemberServiceImpl(ChatRoomMemberRepository chatRoomMemberRepository,
                                     ChatRoomMemberMapper chatRoomMemberMapper,
                                     ChatRoomMemberSearchRepository chatRoomMemberSearchRepository,
                                     ChatRoomMapper chatRoomMapper) {

        this.chatRoomMemberRepository = chatRoomMemberRepository;
        this.chatRoomMemberMapper = chatRoomMemberMapper;
        this.chatRoomMemberSearchRepository = chatRoomMemberSearchRepository;
        this.chatRoomMapper = chatRoomMapper;
    }

    /**
     * Get user's chat room id
     *
     * @param login user login
     * @return a list of chat room of specified user, null will be return, iff the specified user do not have any chat room
     */
    @Override
    public List<Long> getUserChatRoomId(String login) {
        List<ChatRoom> result = this.getUserChatRoomEntity(login);
        if (result == null) return null;
        List<Long> ids = new LinkedList<>();
        result.forEach(each -> {
            ids.add(each.getChatID());
        });
        return ids;
    }

    /**
     * Get user's chat room entities
     *
     * @param login user login
     * @return a list of chat room entities of specified user, null will be return, iff the specified user do not have any chat room
     */
    @Override
    public List<ChatRoom> getUserChatRoomEntity(String login) {
        log.debug("Get a list of chat room from login: {}", login );
        List<ChatRoom> result = this.chatRoomMemberRepository.findChatID(login);
        if (result == null){
            log.debug("can not found any chat room return null");
            return null;
        }
        log.debug("find a list of rooms {}", result);
        return result;
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
     * Get a list of chat rooms and members of chat room that user is currently in
     *
     * @param login user login
     * @return return a list of chat rooms and members of chat room, if user is in any chat room
     */
    @Override
    @Transactional(readOnly = true)
    public List<MemberOfChatRoomDTO> getMembersOfChatRooms(String login) {
        List<MemberOfChatRoomDTO> result = new LinkedList<>();
        List<ChatRoom> rooms =  this.getUserChatRoomEntity(login);
        if (rooms == null) return null;
        log.debug("find a list of rooms: {}", rooms);
        rooms.forEach(each -> {
            List<ChatRoomMemberDTO> members = this.getMembersOfChatRoom(each.getChatID());
            ChatRoomDTO chatRoom  = this.chatRoomMapper.toDto(each);
            if (members != null && chatRoom != null)
            {
                MemberOfChatRoomDTO membersOfChat = new MemberOfChatRoomDTO();
                membersOfChat.setChatRoom(chatRoom);
                membersOfChat.setMembers(members);
                result.add(membersOfChat);
            }
        });
        return result;
    }

    /**
     * Get a list of chat room member by chat room id
     *
     * @param chatId chat room id
     * @return return a list of chat room member, if this chat room is not empty, otherwise null
     */
    @Override
    @Transactional(readOnly = true)
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
