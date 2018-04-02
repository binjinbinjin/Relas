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

    /**
     * Check if  user A  already in friendship with B
     * @param friendLogin user B's login
     * @param userLogin user A's login
     * @return true is A and B are friend
     * */
    boolean existsFriendListByFriendID_LoginAndUserID_Login(String friendLogin, String userLogin);
}
