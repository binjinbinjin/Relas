package relas.java.service;

import relas.java.domain.ChatMessage;
import relas.java.service.dto.*;

import java.util.List;

public interface ChatService {

    /**
     * Create a new chat room
     * @param chat A ChatRoomDTO from the service to create the new chat room
     * @return null if fail, otherwise a ChatRoomDTO will be return
     * */
    ChatRoomDTO newChatRoom(ChatRoomDTO chat);

    /**
     * Get chat room by chat id
     * @param chatId chat room id
     *@return a chatRoomDTO will be return iff chat room exist, otherwise null
     * */
    ChatRoomDTO getChatRoom(Long chatId);


    /**
     * Get User login by id
     * @param id user id
     * @return login if user exist, otherwise null
     * */
    String convertUserIdToUserLogin(Long id);

    /**
     * Add a list of user to the chat room
     * @param  chatId Chat room id
     * @param userLogin a list of users login that want to add to the chat room
     * @return a list a new ChatRoomMemberDTO that just add, otherwise false
     * */
    List<ChatRoomMemberDTO> addUsersToChatRoom(long chatId, List<String> userLogin);

    /**
     * Add a list of user to the chat room
     * @param userId a list of users login that want to add to the chat room
     * @param  chatId Chat room id
     * @return a list a new ChatRoomMemberDTO that just add, otherwise false
     * */
    List<ChatRoomMemberDTO> addUsersToChatRoom(List<Long> userId, long chatId);

    /**
     * Get members of chat room
     * @param chatId chat room id
     * @return return a list of ChatRoomMemberDTO; null will be return for error
     * */
    List<ChatRoomMemberDTO> getChatRoomMember(long chatId);

    /**
     * Save a message to a list of user as an unread message
     * @param userId a list of user's ID
     * @param message ChatMessageDTO
     * @throw NullPointerException if message.id() is null
     * */
    void saveAsUnreadMessage(List<Long> userId, ChatMessageDTO message);

    /**
     * Save the chat message to the database
     * @paran message the message that user wants to save to database
     * @return null if fail, otherwise a ChatMessageDTO will be return
     * */
    ChatMessageDTO newMessage(ChatMessageDTO message);

    /**
     * Get a list of unread message for specifies user
     * @param login user login
     * @return null if there does not exist any unread message, otherwise a list of unread message will be return
     * */
    List<UnreadChatMessageDTO> getUnreadMessages(String login);

    /**
     * Delete the unreadChatMessage by id.
     *
     * @param id the id of the unreadMessage
     */
    public void deleteUnreadMessage(Long id);



}
