package relas.java.web.rest;

import com.codahale.metrics.annotation.Timed;
import relas.java.service.ChatRoomService;
import relas.java.web.rest.errors.BadRequestAlertException;
import relas.java.web.rest.util.HeaderUtil;
import relas.java.web.rest.util.PaginationUtil;
import relas.java.service.dto.ChatRoomDTO;
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
 * REST controller for managing ChatRoom.
 */
@RestController
@RequestMapping("/api")
public class ChatRoomResource {

    private final Logger log = LoggerFactory.getLogger(ChatRoomResource.class);

    private static final String ENTITY_NAME = "chatRoom";

    private final ChatRoomService chatRoomService;

    public ChatRoomResource(ChatRoomService chatRoomService) {
        this.chatRoomService = chatRoomService;
    }

    /**
     * POST  /chat-rooms : Create a new chatRoom.
     *
     * @param chatRoomDTO the chatRoomDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chatRoomDTO, or with status 400 (Bad Request) if the chatRoom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chat-rooms")
    @Timed
    public ResponseEntity<ChatRoomDTO> createChatRoom(@Valid @RequestBody ChatRoomDTO chatRoomDTO) throws URISyntaxException {
        log.debug("REST request to save ChatRoom : {}", chatRoomDTO);
        if (chatRoomDTO.getId() != null) {
            throw new BadRequestAlertException("A new chatRoom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChatRoomDTO result = chatRoomService.save(chatRoomDTO);
        return ResponseEntity.created(new URI("/api/chat-rooms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chat-rooms : Updates an existing chatRoom.
     *
     * @param chatRoomDTO the chatRoomDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chatRoomDTO,
     * or with status 400 (Bad Request) if the chatRoomDTO is not valid,
     * or with status 500 (Internal Server Error) if the chatRoomDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chat-rooms")
    @Timed
    public ResponseEntity<ChatRoomDTO> updateChatRoom(@Valid @RequestBody ChatRoomDTO chatRoomDTO) throws URISyntaxException {
        log.debug("REST request to update ChatRoom : {}", chatRoomDTO);
        if (chatRoomDTO.getId() == null) {
            return createChatRoom(chatRoomDTO);
        }
        ChatRoomDTO result = chatRoomService.save(chatRoomDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chatRoomDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chat-rooms : get all the chatRooms.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of chatRooms in body
     */
    @GetMapping("/chat-rooms")
    @Timed
    public ResponseEntity<List<ChatRoomDTO>> getAllChatRooms(Pageable pageable) {
        log.debug("REST request to get a page of ChatRooms");
        Page<ChatRoomDTO> page = chatRoomService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/chat-rooms");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /chat-rooms/:id : get the "id" chatRoom.
     *
     * @param id the id of the chatRoomDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chatRoomDTO, or with status 404 (Not Found)
     */
    @GetMapping("/chat-rooms/{id}")
    @Timed
    public ResponseEntity<ChatRoomDTO> getChatRoom(@PathVariable Long id) {
        log.debug("REST request to get ChatRoom : {}", id);
        ChatRoomDTO chatRoomDTO = chatRoomService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chatRoomDTO));
    }

    /**
     * DELETE  /chat-rooms/:id : delete the "id" chatRoom.
     *
     * @param id the id of the chatRoomDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chat-rooms/{id}")
    @Timed
    public ResponseEntity<Void> deleteChatRoom(@PathVariable Long id) {
        log.debug("REST request to delete ChatRoom : {}", id);
        chatRoomService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/chat-rooms?query=:query : search for the chatRoom corresponding
     * to the query.
     *
     * @param query the query of the chatRoom search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/chat-rooms")
    @Timed
    public ResponseEntity<List<ChatRoomDTO>> searchChatRooms(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of ChatRooms for query {}", query);
        Page<ChatRoomDTO> page = chatRoomService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/chat-rooms");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
