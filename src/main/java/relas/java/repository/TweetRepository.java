package relas.java.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import relas.java.domain.Tweet;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Tweet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {

    @Query("select tweet from Tweet tweet where tweet.userID.login = ?#{principal.username}")
    List<Tweet> findByUserIDIsCurrentUser();

    /**
     * Get all friend's tweet by user id
     *
     * @param pageable page info
     * @param userid       user id
     * @return the list of entities
     */
    @Query("select t from  Tweet t, FriendList f where f.userID.id = ?1 and f.friendID.id = t.userID.id ")
    Page<Tweet> getFriendsTweets(Long userid, Pageable pageable);

    /**
     * Get all tweet that post by user
     *
     * @param pageable page info
     * @param userId       user id
     * @return the list of entities
     */
    Page<Tweet> findAllByUserID_Id(Long userId, Pageable pageable);

}
