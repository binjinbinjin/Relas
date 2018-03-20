package relas.java.repository;

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

}
