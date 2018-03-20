package relas.java.service.mapper;

import relas.java.domain.*;
import relas.java.service.dto.UnreadChatMessageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UnreadChatMessage and its DTO UnreadChatMessageDTO.
 */
@Mapper(componentModel = "spring", uses = {ChatMessageMapper.class, UserMapper.class})
public interface UnreadChatMessageMapper extends EntityMapper<UnreadChatMessageDTO, UnreadChatMessage> {

    @Mapping(source = "message.id", target = "messageId")
    @Mapping(source = "userID.id", target = "userIDId")
    @Mapping(source = "userID.login", target = "userIDLogin")
    UnreadChatMessageDTO toDto(UnreadChatMessage unreadChatMessage);

    @Mapping(source = "messageId", target = "message")
    @Mapping(source = "userIDId", target = "userID")
    UnreadChatMessage toEntity(UnreadChatMessageDTO unreadChatMessageDTO);

    default UnreadChatMessage fromId(Long id) {
        if (id == null) {
            return null;
        }
        UnreadChatMessage unreadChatMessage = new UnreadChatMessage();
        unreadChatMessage.setId(id);
        return unreadChatMessage;
    }
}
