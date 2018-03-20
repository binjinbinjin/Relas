package relas.java.service.mapper;

import relas.java.domain.*;
import relas.java.service.dto.ChatRoomDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ChatRoom and its DTO ChatRoomDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ChatRoomMapper extends EntityMapper<ChatRoomDTO, ChatRoom> {



    default ChatRoom fromId(Long id) {
        if (id == null) {
            return null;
        }
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setId(id);
        return chatRoom;
    }
}
