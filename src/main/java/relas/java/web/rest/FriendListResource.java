package relas.java.web.rest;

import com.codahale.metrics.annotation.Timed;
import relas.java.service.FriendListService;
import relas.java.web.rest.errors.BadRequestAlertException;
import relas.java.web.rest.util.HeaderUtil;
import relas.java.web.rest.util.PaginationUtil;
import relas.java.service.dto.FriendListDTO;
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
 * REST controller for managing FriendList.
 */
@RestController
@RequestMapping("/api")
public class FriendListResource {

    private final Logger log = LoggerFactory.getLogger(FriendListResource.class);

    private static final String ENTITY_NAME = "friendList";

    private final FriendListService friendListService;

    public FriendListResource(FriendListService friendListService) {
        this.friendListService = friendListService;
    }

    /**
     * POST  /friend-lists : Create a new friendList.
     *
     * @param friendListDTO the friendListDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new friendListDTO, or with status 400 (Bad Request) if the friendList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/friend-lists")
    @Timed
    public ResponseEntity<FriendListDTO> createFriendList(@Valid @RequestBody FriendListDTO friendListDTO) throws URISyntaxException {
        log.debug("REST request to save FriendList : {}", friendListDTO);
        if (friendListDTO.getId() != null) {
            throw new BadRequestAlertException("A new friendList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FriendListDTO result = friendListService.save(friendListDTO);
        return ResponseEntity.created(new URI("/api/friend-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /friend-lists : Updates an existing friendList.
     *
     * @param friendListDTO the friendListDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated friendListDTO,
     * or with status 400 (Bad Request) if the friendListDTO is not valid,
     * or with status 500 (Internal Server Error) if the friendListDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/friend-lists")
    @Timed
    public ResponseEntity<FriendListDTO> updateFriendList(@Valid @RequestBody FriendListDTO friendListDTO) throws URISyntaxException {
        log.debug("REST request to update FriendList : {}", friendListDTO);
        if (friendListDTO.getId() == null) {
            return createFriendList(friendListDTO);
        }
        FriendListDTO result = friendListService.save(friendListDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, friendListDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /friend-lists : get all the friendLists.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of friendLists in body
     */
    @GetMapping("/friend-lists")
    @Timed
    public ResponseEntity<List<FriendListDTO>> getAllFriendLists(Pageable pageable) {
        log.debug("REST request to get a page of FriendLists");
        Page<FriendListDTO> page = friendListService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/friend-lists");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /friend-lists/:id : get the "id" friendList.
     *
     * @param id the id of the friendListDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the friendListDTO, or with status 404 (Not Found)
     */
    @GetMapping("/friend-lists/{id}")
    @Timed
    public ResponseEntity<FriendListDTO> getFriendList(@PathVariable Long id) {
        log.debug("REST request to get FriendList : {}", id);
        FriendListDTO friendListDTO = friendListService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(friendListDTO));
    }

    /**
     * DELETE  /friend-lists/:id : delete the "id" friendList.
     *
     * @param id the id of the friendListDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/friend-lists/{id}")
    @Timed
    public ResponseEntity<Void> deleteFriendList(@PathVariable Long id) {
        log.debug("REST request to delete FriendList : {}", id);
        friendListService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/friend-lists?query=:query : search for the friendList corresponding
     * to the query.
     *
     * @param query the query of the friendList search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/friend-lists")
    @Timed
    public ResponseEntity<List<FriendListDTO>> searchFriendLists(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of FriendLists for query {}", query);
        Page<FriendListDTO> page = friendListService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/friend-lists");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
