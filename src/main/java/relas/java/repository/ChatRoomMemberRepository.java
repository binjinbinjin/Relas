package relas.java.repository;

import relas.java.domain.ChatRoomMember;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the ChatRoomMember entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {

    @Query("select chat_room_member from ChatRoomMember chat_room_member where chat_room_member.memberID.login = ?#{principal.username}")
    List<ChatRoomMember> findByMemberIDIsCurrentUser();

}
