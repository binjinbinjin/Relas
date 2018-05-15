package relas.java.service.impl;

import relas.java.service.TweetService;
import relas.java.domain.Tweet;
import relas.java.repository.TweetRepository;
import relas.java.repository.search.TweetSearchRepository;
import relas.java.service.dto.TweetDTO;
import relas.java.service.mapper.TweetMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Tweet.
 */
@Service
@Transactional
public class TweetServiceImpl implements TweetService {

    private final Logger log = LoggerFactory.getLogger(TweetServiceImpl.class);

    private final TweetRepository tweetRepository;

    private final TweetMapper tweetMapper;

    private final TweetSearchRepository tweetSearchRepository;

    public TweetServiceImpl(TweetRepository tweetRepository, TweetMapper tweetMapper, TweetSearchRepository tweetSearchRepository) {
        this.tweetRepository = tweetRepository;
        this.tweetMapper = tweetMapper;
        this.tweetSearchRepository = tweetSearchRepository;
    }

    /**
     * Save a tweet.
     *
     * @param tweetDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TweetDTO save(TweetDTO tweetDTO) {
        log.debug("Request to save Tweet : {}", tweetDTO);
        Tweet tweet = tweetMapper.toEntity(tweetDTO);
        tweet = tweetRepository.save(tweet);
        TweetDTO result = tweetMapper.toDto(tweet);
        tweetSearchRepository.save(tweet);
        return result;
    }

    /**
     * Get all tweet that post by user
     *
     * @param pageable page info
     * @param id       user id
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TweetDTO> getAllTweetByUserID(Pageable pageable, Long id) {
        log.debug("Get all tweets that post by user with userID: {}  and page info: {}", id, pageable);
        return tweetRepository.findAllByUserID_Id(id, pageable).map(tweetMapper::toDto);
    }

    /**
     * Get all friend's tweet by user id
     *
     * @param pageable page info
     * @param id       user id
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TweetDTO> getAllFriendTweetByUserID(Pageable pageable, Long id) {
        log.debug("Get all tweets that post by friend of user with userID: {}  and page info: {}", id, pageable);
        return tweetRepository.getFriendsTweets(id, pageable).map(tweetMapper::toDto);
    }

    /**
     * Get all the tweets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TweetDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Tweets");
        return tweetRepository.findAll(pageable)
            .map(tweetMapper::toDto);
    }

    /**
     * Get one tweet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TweetDTO findOne(Long id) {
        log.debug("Request to get Tweet : {}", id);
        Tweet tweet = tweetRepository.findOne(id);
        return tweetMapper.toDto(tweet);
    }

    /**
     * Delete the tweet by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tweet : {}", id);
        tweetRepository.delete(id);
        tweetSearchRepository.delete(id);
    }

    /**
     * Search for the tweet corresponding to the query.
     *
     * @param query    the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TweetDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Tweets for query {}", query);
        Page<Tweet> result = tweetSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(tweetMapper::toDto);
    }
}
