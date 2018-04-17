package relas.java.repository;

import org.springframework.data.repository.query.Param;
import relas.java.domain.ChatRoom;
import relas.java.domain.ChatRoomMember;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the ChatRoomMember entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {

    @Query("select chat_room_member from ChatRoomMember chat_room_member where chat_room_member.memberID.login = ?#{principal.username}")
    List<ChatRoomMember> findByMemberIDIsCurrentUser();

    /**
     * Get a list of chat room member by chat room id
     * @param chatId chat room id
     * @return return a list of chat room member, if this chat room is not empty
     * */
    Optional<List<ChatRoomMember>> findChatRoomMemberByChatID_Id(long chatId);

    /**
     * Get the chat
     * */
    @Query("select c.chatID from ChatRoomMember  c where c.memberID.login = :login")
    List<ChatRoom> findChatID(@Param("login")String login);

}
