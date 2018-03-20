package relas.java.service.mapper;

import relas.java.domain.*;
import relas.java.service.dto.ChatMessageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ChatMessage and its DTO ChatMessageDTO.
 */
@Mapper(componentModel = "spring", uses = {ChatRoomMapper.class, UserMapper.class})
public interface ChatMessageMapper extends EntityMapper<ChatMessageDTO, ChatMessage> {

    @Mapping(source = "chatID.id", target = "chatIDId")
    @Mapping(source = "chatID.chatID", target = "chatIDChatID")
    @Mapping(source = "messageSender.id", target = "messageSenderId")
    @Mapping(source = "messageSender.login", target = "messageSenderLogin")
    ChatMessageDTO toDto(ChatMessage chatMessage);

    @Mapping(source = "chatIDId", target = "chatID")
    @Mapping(source = "messageSenderId", target = "messageSender")
    ChatMessage toEntity(ChatMessageDTO chatMessageDTO);

    default ChatMessage fromId(Long id) {
        if (id == null) {
            return null;
        }
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setId(id);
        return chatMessage;
    }
}
