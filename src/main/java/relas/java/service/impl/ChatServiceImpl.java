package relas.java.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import relas.java.domain.ChatMessage;
import relas.java.domain.ChatRoomMember;
import relas.java.domain.UnreadChatMessage;
import relas.java.domain.User;
import relas.java.service.*;
import relas.java.service.dto.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ChatServiceImpl implements ChatService{

    private final ChatMessageService chatMessageService;
    private final UnreadChatMessageService unreadChatMessageService;
    private final ChatRoomService chatRoomService;
    private final ChatRoomMemberService chatRoomMemberService;
    private final UserService userService;

    public ChatServiceImpl(ChatMessageService chatMessageService,
                           UnreadChatMessageService unreadChatMessageService,
                           ChatRoomService chatRoomService,
                           ChatRoomMemberService chatRoomMemberService,
                           UserService userService) {
        this.chatMessageService = chatMessageService;
        this.unreadChatMessageService = unreadChatMessageService;
        this.chatRoomMemberService = chatRoomMemberService;
        this.chatRoomService = chatRoomService;
        this.userService = userService;
    }
    /**
     * Create a new chat room
     *
     * @param chat A ChatRoomDTO from the service to create the new chat room
     * @return null if fail, otherwise a ChatRoomDTO will be return
     */
    @Override
    public ChatRoomDTO newChatRoom(ChatRoomDTO chat) {
        return this.chatRoomService.save(chat);
    }

    /**
     * Add a list of user to the chat room
     * @param  chatId Chat room id
     * @param userLogin a list of users login that want to add to the chat room
     * @return true if successfully add those users to chat room, else false
     * */
    @Override
    public boolean addUsersToChatRoom(long chatId, List<String> userLogin) {
        userLogin.forEach(login -> {
            this.chatRoomMemberService.save(this.newChatRoomMember(chatId, login));
        });
        return true;
    }

    /**
     * Get members of chat room
     *
     * @param chatId chat room id
     * @return return a list of ChatRoomMemberDTO; null will be return for error
     */
    @Override
    public List<ChatRoomMemberDTO> getChatRoomMember(long chatId) {
        return this.chatRoomMemberService.getMembersOfChatRoom(chatId);
    }

    /**
     * Save a message to a list of user as an unread message
     * @param userId a list of user's ID
     * @param message ChatMessageDTO
     * @throw NullPointerException if either message.getId() is null or message.getMessageSenderId() is null
     * */
    @Override
    public void saveAsUnreadMessage(List<Long> userId, ChatMessageDTO message) {
        if (message.getId() == null && message.getMessageSenderId() == null)
            throw new NullPointerException("Message id can not be empty, which means message must save to database first");
        long messageId = message.getId();
        long senderId = message.getMessageSenderId();
        userId.forEach(id -> {
            if (id == senderId)
                return;
            UnreadChatMessageDTO  newUnreadMessageDTO = new UnreadChatMessageDTO();
            newUnreadMessageDTO.setMessageId(messageId);
            newUnreadMessageDTO.setUserIDId(id);
            this.unreadChatMessageService.save(newUnreadMessageDTO);
        });
    }

    /**
     * Save the chat message to the database
     *
     * @param message
     * @param message the message that user wants to save to database
     * @return null if fail, otherwise a ChatMessageDTO will be return
     *
     */
    @Override
    public ChatMessageDTO newMessage(ChatMessageDTO message) {
        return  this.chatMessageService.save(message);
    }

    /**
     * Delete the unreadChatMessage by id.
     *
     * @param id the id of the unreadMessage
     */
    @Override
    public void deleteUnreadMessage(Long id) {
        this.unreadChatMessageService.delete(id);
    }

    /**
     * Get a list of unread message for specifies user
     *
     * @param login user login
     * @return null if there does not exist any unread message, otherwise a list of unread message will be return
     */
    @Override
    public List<UnreadChatMessageDTO> getUnreadMessages(String login) {
        return this.unreadChatMessageService.getUnreadMessageByLogin(login);
    }

    /**
     * Create a ChatRoomMemberDTO by chat room id and user login
     *
     * @param chatId chat room id
     * @param login user login
     * @return a ChatRoomMemberDTO
     * */
    private ChatRoomMemberDTO newChatRoomMember(long chatId, String login){
        Optional<User> user = this.userService.getUserWithAuthoritiesByLogin(login);
        if (!user.isPresent())
            return null;
        long userId = user.get().getId();
        ChatRoomMemberDTO newMember = new ChatRoomMemberDTO();
        newMember.setChatIDId(chatId);
        newMember.setMemberIDId(userId);
        return newMember;
    }


}
