package relas.java.web.rest;

import com.codahale.metrics.annotation.Timed;
import relas.java.service.ChatRoomMemberService;
import relas.java.web.rest.dto.MemberOfChatRoomDTO;
import relas.java.web.rest.errors.BadRequestAlertException;
import relas.java.web.rest.util.HeaderUtil;
import relas.java.web.rest.util.PaginationUtil;
import relas.java.service.dto.ChatRoomMemberDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing ChatRoomMember.
 */
@RestController
@RequestMapping("/api")
public class ChatRoomMemberResource {

    private final Logger log = LoggerFactory.getLogger(ChatRoomMemberResource.class);

    private static final String ENTITY_NAME = "chatRoomMember";

    private final ChatRoomMemberService chatRoomMemberService;

    public ChatRoomMemberResource(ChatRoomMemberService chatRoomMemberService) {
        this.chatRoomMemberService = chatRoomMemberService;
    }

    /**
     * POST  /chat-room-members : Create a new chatRoomMember.
     *
     * @param chatRoomMemberDTO the chatRoomMemberDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chatRoomMemberDTO, or with status 400 (Bad Request) if the chatRoomMember has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chat-room-members")
    @Timed
    public ResponseEntity<ChatRoomMemberDTO> createChatRoomMember(@Valid @RequestBody ChatRoomMemberDTO chatRoomMemberDTO) throws URISyntaxException {
        log.debug("REST request to save ChatRoomMember : {}", chatRoomMemberDTO);
        if (chatRoomMemberDTO.getId() != null) {
            throw new BadRequestAlertException("A new chatRoomMember cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChatRoomMemberDTO result = chatRoomMemberService.save(chatRoomMemberDTO);
        return ResponseEntity.created(new URI("/api/chat-room-members/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chat-room-members : Updates an existing chatRoomMember.
     *
     * @param chatRoomMemberDTO the chatRoomMemberDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chatRoomMemberDTO,
     * or with status 400 (Bad Request) if the chatRoomMemberDTO is not valid,
     * or with status 500 (Internal Server Error) if the chatRoomMemberDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chat-room-members")
    @Timed
    public ResponseEntity<ChatRoomMemberDTO> updateChatRoomMember(@Valid @RequestBody ChatRoomMemberDTO chatRoomMemberDTO) throws URISyntaxException {
        log.debug("REST request to update ChatRoomMember : {}", chatRoomMemberDTO);
        if (chatRoomMemberDTO.getId() == null) {
            return createChatRoomMember(chatRoomMemberDTO);
        }
        ChatRoomMemberDTO result = chatRoomMemberService.save(chatRoomMemberDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chatRoomMemberDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chat-room-members : get all the chatRoomMembers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of chatRoomMembers in body
     */
    @GetMapping("/chat-room-members")
    @Timed
    public ResponseEntity<List<ChatRoomMemberDTO>> getAllChatRoomMembers(Pageable pageable) {
        log.debug("REST request to get a page of ChatRoomMembers");
        Page<ChatRoomMemberDTO> page = chatRoomMemberService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/chat-room-members");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /chat-room-members/:id : get the "id" chatRoomMember.
     *
     * @param id the id of the chatRoomMemberDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chatRoomMemberDTO, or with status 404 (Not Found)
     */
    @GetMapping("/chat-room-members/{id}")
    @Timed
    public ResponseEntity<ChatRoomMemberDTO> getChatRoomMember(@PathVariable Long id) {
        log.debug("REST request to get ChatRoomMember : {}", id);
        ChatRoomMemberDTO chatRoomMemberDTO = chatRoomMemberService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chatRoomMemberDTO));
    }


 /**
     * GET  /chat-room-members/chat_ids/:login ; get all the chat room id that user is currently
     *
     * @param login the login of user
     * @return the ResponseEntity with status 200 (OK) and with body the List<Long>, or with status 404 (Not Found)
     */
    @GetMapping("/chat-room-members/chat_ids/{login}")
    @Timed
    public ResponseEntity<List<Long>> getUserChatRoomIds(@PathVariable String login) {
        log.debug("REST request get all the chat room id that user is currently in : {}", login);
        List<Long> chatRoomId = this.chatRoomMemberService.getUserChatRoomId(login);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chatRoomId));
    }

    /**
     * GET  /chat-room-members/chat_ids/:login ; get all the chat room id that user is currently
     *
     * @param login the login of user
     * @return the ResponseEntity with status 200 (OK) and with body the List<Long>, or with status 404 (Not Found)
     */
    @GetMapping("/chat-room-members/membersOfChatRooms/{login}")
    @Timed
    public ResponseEntity<List<MemberOfChatRoomDTO>> getUserChatRoomsAndChatRoomMembers(@PathVariable String login) {
        log.debug("REST request all chat rooms and members of chat rooms that user is currently in, user : {}", login);
        List<MemberOfChatRoomDTO> result = this.chatRoomMemberService.getMembersOfChatRooms(login);

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(result));
    }

    /**
     * GET  /chat-room-members/allMembers/:chatID ; get all the chat room id that user is currently
     *
     * @param chatID chatID of chat room
     * @return the ResponseEntity with status 200 (OK) and with body the List<chatRoomMemberDTO>, or with status 404 (Not Found)
     */
    @GetMapping("/chat-room-members/allMembers/{chatID}")
    @Timed
    public ResponseEntity<List<ChatRoomMemberDTO>> getUserChatRoomIds(@PathVariable Long chatID) {
        log.debug("REST request get members of chat room : {}", chatID);
        List<ChatRoomMemberDTO> members = this.chatRoomMemberService.getMembersOfChatRoom(chatID);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(members));
    }



    /**
     * DELETE  /chat-room-members/:id : delete the "id" chatRoomMember.
     *
     * @param id the id of the chatRoomMemberDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chat-room-members/{id}")
    @Timed
    public ResponseEntity<Void> deleteChatRoomMember(@PathVariable Long id) {
        log.debug("REST request to delete ChatRoomMember : {}", id);
        chatRoomMemberService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/chat-room-members?query=:query : search for the chatRoomMember corresponding
     * to the query.
     *
     * @param query the query of the chatRoomMember search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/chat-room-members")
    @Timed
    public ResponseEntity<List<ChatRoomMemberDTO>> searchChatRoomMembers(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of ChatRoomMembers for query {}", query);
        Page<ChatRoomMemberDTO> page = chatRoomMemberService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/chat-room-members");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
