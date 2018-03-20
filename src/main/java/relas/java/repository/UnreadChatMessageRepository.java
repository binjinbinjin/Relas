package relas.java.repository;

import relas.java.domain.UnreadChatMessage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the UnreadChatMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnreadChatMessageRepository extends JpaRepository<UnreadChatMessage, Long> {

    @Query("select unread_chat_message from UnreadChatMessage unread_chat_message where unread_chat_message.userID.login = ?#{principal.username}")
    List<UnreadChatMessage> findByUserIDIsCurrentUser();

}
