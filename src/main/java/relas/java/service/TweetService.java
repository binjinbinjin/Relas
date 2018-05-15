package relas.java.service;

import relas.java.service.dto.TweetDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Tweet.
 */
public interface TweetService {

    /**
     * Save a tweet.
     *
     * @param tweetDTO the entity to save
     * @return the persisted entity
     */
    TweetDTO save(TweetDTO tweetDTO);

    /**
     * Get all tweet that post by user
     *
     * @param  pageable page info
     * @param id user id
     * @return  the list of entities
     * */
    Page<TweetDTO> getAllTweetByUserID(Pageable pageable, Long id);

    /**
     * Get all friend's tweet by user
     *
     * @param  pageable page info
     * @param id user id
     * @return  the list of entities
     * */
    Page<TweetDTO> getAllFriendTweetByUserID(Pageable pageable, Long id);

    /**
     * Get all the tweets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TweetDTO> findAll(Pageable pageable);

    /**
     * Get the "id" tweet.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TweetDTO findOne(Long id);

    /**
     * Delete the "id" tweet.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the tweet corresponding to the query.
     *
     * @param query the query of the search
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TweetDTO> search(String query, Pageable pageable);
}
