package relas.java.web.rest;

import com.codahale.metrics.annotation.Timed;
import relas.java.service.UnreadChatMessageService;
import relas.java.web.rest.errors.BadRequestAlertException;
import relas.java.web.rest.util.HeaderUtil;
import relas.java.web.rest.util.PaginationUtil;
import relas.java.service.dto.UnreadChatMessageDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Nullable;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing UnreadChatMessage.
 */
@RestController
@RequestMapping("/api")
public class UnreadChatMessageResource {

    private final Logger log = LoggerFactory.getLogger(UnreadChatMessageResource.class);

    private static final String ENTITY_NAME = "unreadChatMessage";

    private final UnreadChatMessageService unreadChatMessageService;

    public UnreadChatMessageResource(UnreadChatMessageService unreadChatMessageService) {
        this.unreadChatMessageService = unreadChatMessageService;
    }

    /**
     * POST  /unread-chat-messages : Create a new unreadChatMessage.
     *
     * @param unreadChatMessageDTO the unreadChatMessageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new unreadChatMessageDTO, or with status 400 (Bad Request) if the unreadChatMessage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/unread-chat-messages")
    @Timed
    public ResponseEntity<UnreadChatMessageDTO> createUnreadChatMessage(@Valid @RequestBody UnreadChatMessageDTO unreadChatMessageDTO) throws URISyntaxException {
        log.debug("REST request to save UnreadChatMessage : {}", unreadChatMessageDTO);
        if (unreadChatMessageDTO.getId() != null) {
            throw new BadRequestAlertException("A new unreadChatMessage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UnreadChatMessageDTO result = unreadChatMessageService.save(unreadChatMessageDTO);
        return ResponseEntity.created(new URI("/api/unread-chat-messages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /unread-chat-messages : Updates an existing unreadChatMessage.
     *
     * @param unreadChatMessageDTO the unreadChatMessageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated unreadChatMessageDTO,
     * or with status 400 (Bad Request) if the unreadChatMessageDTO is not valid,
     * or with status 500 (Internal Server Error) if the unreadChatMessageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/unread-chat-messages")
    @Timed
    public ResponseEntity<UnreadChatMessageDTO> updateUnreadChatMessage(@Valid @RequestBody UnreadChatMessageDTO unreadChatMessageDTO) throws URISyntaxException {
        log.debug("REST request to update UnreadChatMessage : {}", unreadChatMessageDTO);
        if (unreadChatMessageDTO.getId() == null) {
            return createUnreadChatMessage(unreadChatMessageDTO);
        }
        UnreadChatMessageDTO result = unreadChatMessageService.save(unreadChatMessageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, unreadChatMessageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /unread-chat-messages : get all the unreadChatMessages.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of unreadChatMessages in body
     */
    @GetMapping("/unread-chat-messages")
    @Timed
    public ResponseEntity<List<UnreadChatMessageDTO>> getAllUnreadChatMessages(Pageable pageable) {
        log.debug("REST request to get a page of UnreadChatMessages");
        Page<UnreadChatMessageDTO> page = unreadChatMessageService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/unread-chat-messages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /unread-chat-messages/:id : get the "id" unreadChatMessage.
     *
     * @param id the id of the unreadChatMessageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the unreadChatMessageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/unread-chat-messages/{id}")
    @Timed
    public ResponseEntity<UnreadChatMessageDTO> getUnreadChatMessage(@PathVariable Long id) {
        log.debug("REST request to get UnreadChatMessage : {}", id);
        UnreadChatMessageDTO unreadChatMessageDTO = unreadChatMessageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(unreadChatMessageDTO));
    }

    /**
     * GET  /unread-chat-messages/:login : get the "login" unreadChatMessage.
     *
     * @param login the user login
     * @return the ResponseEntity with status 200 (OK) and with body the unreadChatMessageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/unread-chat-messages/{login}")
    @Timed
    public ResponseEntity<List<UnreadChatMessageDTO>> getUnreadChatMessages(@PathVariable String login) {
        log.debug("REST request to get a list of UnreadChatMessage : {}", login);
        List<UnreadChatMessageDTO> unreadChatMessageDTO = this.unreadChatMessageService.getUnreadMessageByLogin(login);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(unreadChatMessageDTO));
    }

    /**
     * Delete /unread-chat-messages/remove?userLogin=login&messageId=id
     *@param login user login
     *@param id message id (ChatMessage entity id)
     *@return the ResponseEntity with status 200 (OK)
     * */
    @DeleteMapping("/unread-chat-messages/remove")
    @Timed
    public ResponseEntity<Void> deleteUnreadChatMessage(@NotNull @PathVariable("userLogin") String login, @NotNull @PathVariable("messageId") Long id) {
        this.unreadChatMessageService.deleteByLoginAndMessageId(login, id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, login + id.toString())).build();
    }

    /**
     * DELETE  /unread-chat-messages/:id : delete the "id" unreadChatMessage.
     *
     * @param id the id of the unreadChatMessageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/unread-chat-messages/{id}")
    @Timed
    public ResponseEntity<Void> deleteUnreadChatMessage(@PathVariable Long id) {
        log.debug("REST request to delete UnreadChatMessage : {}", id);
        unreadChatMessageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/unread-chat-messages?query=:query : search for the unreadChatMessage corresponding
     * to the query.
     *
     * @param query the query of the unreadChatMessage search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/unread-chat-messages")
    @Timed
    public ResponseEntity<List<UnreadChatMessageDTO>> searchUnreadChatMessages(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of UnreadChatMessages for query {}", query);
        Page<UnreadChatMessageDTO> page = unreadChatMessageService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/unread-chat-messages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
