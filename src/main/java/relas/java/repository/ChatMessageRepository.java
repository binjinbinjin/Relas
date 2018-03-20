package relas.java.repository;

import relas.java.domain.ChatMessage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the ChatMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("select chat_message from ChatMessage chat_message where chat_message.messageSender.login = ?#{principal.username}")
    List<ChatMessage> findByMessageSenderIsCurrentUser();

}
