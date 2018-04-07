package relas.java.repository;

import relas.java.domain.UnreadChatMessage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the UnreadChatMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnreadChatMessageRepository extends JpaRepository<UnreadChatMessage, Long> {

    @Query("select unread_chat_message from UnreadChatMessage unread_chat_message where unread_chat_message.userID.login = ?#{principal.username}")
    List<UnreadChatMessage> findByUserIDIsCurrentUser();

    /**
     *  Get entity by user login
     * @param login user login
     * @return if specified user exist at least one unread message than a list of unread message
     *          will be return, otherwise a null will be return
     * */
    Optional<List<UnreadChatMessage>> findUnreadChatMessageByUserID_Login(String login);

    /**
     *  Remove entity by user login and ChatMessage id
     *  @param login user login
     *  @param id message id
     * */
    void deleteByUserID_LoginAndMessage_Id(String login, long id);

}
