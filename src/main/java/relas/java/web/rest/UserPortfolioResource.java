package relas.java.web.rest;

import com.codahale.metrics.annotation.Timed;
import relas.java.service.UserPortfolioService;
import relas.java.web.rest.errors.BadRequestAlertException;
import relas.java.web.rest.util.HeaderUtil;
import relas.java.web.rest.util.PaginationUtil;
import relas.java.service.dto.UserPortfolioDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing UserPortfolio.
 */
@RestController
@RequestMapping("/api")
public class UserPortfolioResource {

    private final Logger log = LoggerFactory.getLogger(UserPortfolioResource.class);

    private static final String ENTITY_NAME = "userPortfolio";

    private final UserPortfolioService userPortfolioService;

    public UserPortfolioResource(UserPortfolioService userPortfolioService) {
        this.userPortfolioService = userPortfolioService;
    }

    /**
     * POST  /user-portfolios : Create a new userPortfolio.
     *
     * @param userPortfolioDTO the userPortfolioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userPortfolioDTO, or with status 400 (Bad Request) if the userPortfolio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-portfolios")
    @Timed
    public ResponseEntity<UserPortfolioDTO> createUserPortfolio(@RequestBody UserPortfolioDTO userPortfolioDTO) throws URISyntaxException {
        log.debug("REST request to save UserPortfolio : {}", userPortfolioDTO);
        if (userPortfolioDTO.getId() != null) {
            throw new BadRequestAlertException("A new userPortfolio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserPortfolioDTO result = userPortfolioService.save(userPortfolioDTO);
        return ResponseEntity.created(new URI("/api/user-portfolios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-portfolios : Updates an existing userPortfolio.
     *
     * @param userPortfolioDTO the userPortfolioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userPortfolioDTO,
     * or with status 400 (Bad Request) if the userPortfolioDTO is not valid,
     * or with status 500 (Internal Server Error) if the userPortfolioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-portfolios")
    @Timed
    public ResponseEntity<UserPortfolioDTO> updateUserPortfolio(@RequestBody UserPortfolioDTO userPortfolioDTO) throws URISyntaxException {
        log.debug("REST request to update UserPortfolio : {}", userPortfolioDTO);
        if (userPortfolioDTO.getId() == null) {
            return createUserPortfolio(userPortfolioDTO);
        }
        UserPortfolioDTO result = userPortfolioService.save(userPortfolioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userPortfolioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-portfolios : get all the userPortfolios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userPortfolios in body
     */
    @GetMapping("/user-portfolios")
    @Timed
    public ResponseEntity<List<UserPortfolioDTO>> getAllUserPortfolios(Pageable pageable) {
        log.debug("REST request to get a page of UserPortfolios");
        Page<UserPortfolioDTO> page = userPortfolioService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-portfolios");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-portfolios/:id : get the "id" userPortfolio.
     *
     * @param id the id of the userPortfolioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userPortfolioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-portfolios/{id}")
    @Timed
    public ResponseEntity<UserPortfolioDTO> getUserPortfolio(@PathVariable Long id) {
        log.debug("REST request to get UserPortfolio : {}", id);
        UserPortfolioDTO userPortfolioDTO = userPortfolioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userPortfolioDTO));
    }

    /**
     * DELETE  /user-portfolios/:id : delete the "id" userPortfolio.
     *
     * @param id the id of the userPortfolioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-portfolios/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserPortfolio(@PathVariable Long id) {
        log.debug("REST request to delete UserPortfolio : {}", id);
        userPortfolioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/user-portfolios?query=:query : search for the userPortfolio corresponding
     * to the query.
     *
     * @param query the query of the userPortfolio search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/user-portfolios")
    @Timed
    public ResponseEntity<List<UserPortfolioDTO>> searchUserPortfolios(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of UserPortfolios for query {}", query);
        Page<UserPortfolioDTO> page = userPortfolioService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/user-portfolios");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
