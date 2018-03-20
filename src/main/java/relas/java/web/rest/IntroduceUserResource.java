package relas.java.web.rest;

import com.codahale.metrics.annotation.Timed;
import relas.java.service.IntroduceUserService;
import relas.java.web.rest.errors.BadRequestAlertException;
import relas.java.web.rest.util.HeaderUtil;
import relas.java.web.rest.util.PaginationUtil;
import relas.java.service.dto.IntroduceUserDTO;
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
 * REST controller for managing IntroduceUser.
 */
@RestController
@RequestMapping("/api")
public class IntroduceUserResource {

    private final Logger log = LoggerFactory.getLogger(IntroduceUserResource.class);

    private static final String ENTITY_NAME = "introduceUser";

    private final IntroduceUserService introduceUserService;

    public IntroduceUserResource(IntroduceUserService introduceUserService) {
        this.introduceUserService = introduceUserService;
    }

    /**
     * POST  /introduce-users : Create a new introduceUser.
     *
     * @param introduceUserDTO the introduceUserDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new introduceUserDTO, or with status 400 (Bad Request) if the introduceUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/introduce-users")
    @Timed
    public ResponseEntity<IntroduceUserDTO> createIntroduceUser(@Valid @RequestBody IntroduceUserDTO introduceUserDTO) throws URISyntaxException {
        log.debug("REST request to save IntroduceUser : {}", introduceUserDTO);
        if (introduceUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new introduceUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IntroduceUserDTO result = introduceUserService.save(introduceUserDTO);
        return ResponseEntity.created(new URI("/api/introduce-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /introduce-users : Updates an existing introduceUser.
     *
     * @param introduceUserDTO the introduceUserDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated introduceUserDTO,
     * or with status 400 (Bad Request) if the introduceUserDTO is not valid,
     * or with status 500 (Internal Server Error) if the introduceUserDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/introduce-users")
    @Timed
    public ResponseEntity<IntroduceUserDTO> updateIntroduceUser(@Valid @RequestBody IntroduceUserDTO introduceUserDTO) throws URISyntaxException {
        log.debug("REST request to update IntroduceUser : {}", introduceUserDTO);
        if (introduceUserDTO.getId() == null) {
            return createIntroduceUser(introduceUserDTO);
        }
        IntroduceUserDTO result = introduceUserService.save(introduceUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, introduceUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /introduce-users : get all the introduceUsers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of introduceUsers in body
     */
    @GetMapping("/introduce-users")
    @Timed
    public ResponseEntity<List<IntroduceUserDTO>> getAllIntroduceUsers(Pageable pageable) {
        log.debug("REST request to get a page of IntroduceUsers");
        Page<IntroduceUserDTO> page = introduceUserService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/introduce-users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /introduce-users/:id : get the "id" introduceUser.
     *
     * @param id the id of the introduceUserDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the introduceUserDTO, or with status 404 (Not Found)
     */
    @GetMapping("/introduce-users/{id}")
    @Timed
    public ResponseEntity<IntroduceUserDTO> getIntroduceUser(@PathVariable Long id) {
        log.debug("REST request to get IntroduceUser : {}", id);
        IntroduceUserDTO introduceUserDTO = introduceUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(introduceUserDTO));
    }

    /**
     * DELETE  /introduce-users/:id : delete the "id" introduceUser.
     *
     * @param id the id of the introduceUserDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/introduce-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteIntroduceUser(@PathVariable Long id) {
        log.debug("REST request to delete IntroduceUser : {}", id);
        introduceUserService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/introduce-users?query=:query : search for the introduceUser corresponding
     * to the query.
     *
     * @param query the query of the introduceUser search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/introduce-users")
    @Timed
    public ResponseEntity<List<IntroduceUserDTO>> searchIntroduceUsers(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of IntroduceUsers for query {}", query);
        Page<IntroduceUserDTO> page = introduceUserService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/introduce-users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
