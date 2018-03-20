package relas.java.service.mapper;

import relas.java.domain.*;
import relas.java.service.dto.ChatRoomMemberDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ChatRoomMember and its DTO ChatRoomMemberDTO.
 */
@Mapper(componentModel = "spring", uses = {ChatRoomMapper.class, UserMapper.class})
public interface ChatRoomMemberMapper extends EntityMapper<ChatRoomMemberDTO, ChatRoomMember> {

    @Mapping(source = "chatID.id", target = "chatIDId")
    @Mapping(source = "chatID.chatID", target = "chatIDChatID")
    @Mapping(source = "memberID.id", target = "memberIDId")
    @Mapping(source = "memberID.login", target = "memberIDLogin")
    ChatRoomMemberDTO toDto(ChatRoomMember chatRoomMember);

    @Mapping(source = "chatIDId", target = "chatID")
    @Mapping(source = "memberIDId", target = "memberID")
    ChatRoomMember toEntity(ChatRoomMemberDTO chatRoomMemberDTO);

    default ChatRoomMember fromId(Long id) {
        if (id == null) {
            return null;
        }
        ChatRoomMember chatRoomMember = new ChatRoomMember();
        chatRoomMember.setId(id);
        return chatRoomMember;
    }
}
