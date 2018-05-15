package relas.java.web.rest;

import com.codahale.metrics.annotation.Timed;
import relas.java.service.TweetService;
import relas.java.web.rest.errors.BadRequestAlertException;
import relas.java.web.rest.util.HeaderUtil;
import relas.java.web.rest.util.PaginationUtil;
import relas.java.service.dto.TweetDTO;
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
 * REST controller for managing Tweet.
 */
@RestController
@RequestMapping("/api")
public class TweetResource {

    private final Logger log = LoggerFactory.getLogger(TweetResource.class);

    private static final String ENTITY_NAME = "tweet";

    private final TweetService tweetService;

    public TweetResource(TweetService tweetService) {
        this.tweetService = tweetService;
    }

    /**
     * POST  /tweets : Create a new tweet.
     *
     * @param tweetDTO the tweetDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tweetDTO, or with status 400 (Bad Request) if the tweet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tweets")
    @Timed
    public ResponseEntity<TweetDTO> createTweet(@Valid @RequestBody TweetDTO tweetDTO) throws URISyntaxException {
        log.debug("REST request to save Tweet : {}", tweetDTO);
        if (tweetDTO.getId() != null) {
            throw new BadRequestAlertException("A new tweet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TweetDTO result = tweetService.save(tweetDTO);
        return ResponseEntity.created(new URI("/api/tweets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tweets : Updates an existing tweet.
     *
     * @param tweetDTO the tweetDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tweetDTO,
     * or with status 400 (Bad Request) if the tweetDTO is not valid,
     * or with status 500 (Internal Server Error) if the tweetDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tweets")
    @Timed
    public ResponseEntity<TweetDTO> updateTweet(@Valid @RequestBody TweetDTO tweetDTO) throws URISyntaxException {
        log.debug("REST request to update Tweet : {}", tweetDTO);
        if (tweetDTO.getId() == null) {
            return createTweet(tweetDTO);
        }
        TweetDTO result = tweetService.save(tweetDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tweetDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tweets : get all the tweets.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tweets in body
     */
    @GetMapping("/tweets")
    @Timed
    public ResponseEntity<List<TweetDTO>> getAllTweets(Pageable pageable) {
        log.debug("REST request to get a page of Tweets");
        Page<TweetDTO> page = tweetService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tweets");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tweets/:id : get the "id" tweet.
     *
     * @param id the id of the tweetDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tweetDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tweets/{id}")
    @Timed
    public ResponseEntity<TweetDTO> getTweet(@PathVariable Long id) {
        log.debug("REST request to get Tweet : {}", id);
        TweetDTO tweetDTO = tweetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tweetDTO));
    }

    /**
     * DELETE  /tweets/:id : delete the "id" tweet.
     *
     * @param id the id of the tweetDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tweets/{id}")
    @Timed
    public ResponseEntity<Void> deleteTweet(@PathVariable Long id) {
        log.debug("REST request to delete Tweet : {}", id);
        tweetService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * Get all tweets that were posted by user
     * /getAllTweets?id=:<id>&<pageInfo>
     *
     * @param id    userID
     * @param pageable the pagination information
     * @return all tweets that post by user
     */
    @GetMapping("/tweets/getAllTweets")
    @Timed
    public ResponseEntity<List<TweetDTO>> getAllTweets(@RequestParam Long id, Pageable pageable) {
        log.debug("REST get all friend tweet id: {}   pageable: {}", id, pageable);
        Page<TweetDTO> page = tweetService.getAllTweetByUserID(pageable, id);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "api/tweets/getAllTweet");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);

    }

    /**
     * Get all tweets that were posted by user's friends
     * /getAllTweets?id=:<id>&<pageInfo>
     *
     * @param id    userID
     * @param pageable the pagination information
     * @return all tweets that post by user
     */
    @GetMapping("/tweets/getAllFriendsTweets")
    @Timed
    public ResponseEntity<List<TweetDTO>> getAllFriendsTweets(@RequestParam Long id, Pageable pageable) {
        log.debug("REST get all friend tweet id: {}   pageable: {}", id, pageable);
        Page<TweetDTO> page = tweetService.getAllFriendTweetByUserID(pageable, id);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "api/tweets/getAllTweet");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);

    }

    /**
     * SEARCH  /_search/tweets?query=:query : search for the tweet corresponding
     * to the query.
     *
     * @param query    the query of the tweet search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/tweets")
    @Timed
    public ResponseEntity<List<TweetDTO>> searchTweets(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Tweets for query {}", query);
        Page<TweetDTO> page = tweetService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/tweets");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
