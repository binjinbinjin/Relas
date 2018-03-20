package relas.java.repository;

import relas.java.domain.FriendList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the FriendList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FriendListRepository extends JpaRepository<FriendList, Long> {

    @Query("select friend_list from FriendList friend_list where friend_list.userID.login = ?#{principal.username}")
    List<FriendList> findByUserIDIsCurrentUser();

    @Query("select friend_list from FriendList friend_list where friend_list.friendID.login = ?#{principal.username}")
    List<FriendList> findByFriendIDIsCurrentUser();

}
