package relas.java.web.websocket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import relas.java.service.ChatService;
import relas.java.service.dto.ChatMessageDTO;
import relas.java.service.dto.ChatRoomDTO;
import relas.java.service.dto.ChatRoomMemberDTO;
import relas.java.service.dto.UnreadChatMessageDTO;
import relas.java.web.websocket.Abst.ServiceWithInitialSubscribeListener;
import relas.java.web.websocket.dto.AddChatMemberDTO;
import relas.java.web.websocket.dto.NewRoomAndMemberDTO;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.LinkedList;
import java.util.List;
@Controller
public class ChatSocketService extends ServiceWithInitialSubscribeListener{

    private final ChatService chatService;
    public ChatSocketService(SimpMessageSendingOperations messagingTemplate, SimpUserRegistry defaultSimpUserRegistry, ChatService chatService) {
        super(messagingTemplate, defaultSimpUserRegistry, ChatSocketService.class);
        this.chatService = chatService;
    }

    @SubscribeMapping("/chat/{login}")
    @SendTo("/chat/{login}")
    public UnreadChatMessageDTO subscribeChat(@NotNull @DestinationVariable String login, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        log.debug("User subscribed the unread message {}", login);
        this.authenticatedCheck(stompHeaderAccessor, principal, login);
        return null;
    }

    @MessageMapping("/chat/new/message")
    public void newMessage(@NotNull @Payload ChatMessageDTO dto,  StompHeaderAccessor stompHeaderAccessor, Principal principal) {
       log.debug("new message: {}",dto );
       List<ChatRoomMemberDTO> members = this.chatService.getChatRoomMember(dto.getChatIDId());
       List<Long> userId = new LinkedList<>();
       List<String> userLogin = new LinkedList<>();
       members.forEach(each -> {
           userId.add(each.getMemberIDId());
           userLogin.add(each.getMemberIDLogin());
       });
       ChatMessageDTO savedMessage = this.chatService.newMessage(dto);
       savedMessage.setMessageSenderLogin(principal.getName());
       this.chatService.saveAsUnreadMessage(userId, savedMessage);
       userLogin.forEach(each -> {
           this.messagingTemplate.convertAndSend("/chat/" + each, savedMessage);
       });
    }

    @MessageMapping("/chat/add/member")
    public void addChatMembers(@NotNull @Payload AddChatMemberDTO dto, StompHeaderAccessor stompHeaderAccessor, Principal principal){
        List<ChatRoomMemberDTO> existMember = this.chatService.getChatRoomMember(dto.getChatId());
        List<ChatRoomMemberDTO> newUser = this.chatService.addUsersToChatRoom(dto.getAddMembers(),dto.getChatId());
        String currentUser = principal.getName();
        if (newUser == null)
            return;
        ChatRoomDTO chatRoom = this.chatService.getChatRoom(dto.getChatId());
        dto.getAddMembers().forEach(id -> {
            String login = this.chatService.convertUserIdToUserLogin(id);
            if (login == currentUser){
                this.messagingTemplate.convertAndSend("/chat/"+login, newUser);
            }else {
                this.messagingTemplate.convertAndSend("/chat/"+login, chatRoom);
            }
        });
        if (existMember == null) return;
        existMember.forEach(each -> {
            this.messagingTemplate.convertAndSend("/chat/"+each.getMemberIDLogin(), newUser);
        });
    }

    @MessageMapping("/chat/room/members")
    public void newRoomAndChatMembers(@NotNull @Payload NewRoomAndMemberDTO dto, StompHeaderAccessor stompHeaderAccessor, Principal principal){
        ChatRoomDTO room = this.chatService.newChatRoom(dto.getRoom());
        if (room == null) return;
        List<ChatRoomMemberDTO> newUser = this.chatService.addUsersToChatRoom(dto.getNewMembers().getAddMembers(), room.getChatID());
        String currentUser = principal.getName();
        if (newUser == null)
            return;
        dto.setRoomMembers(newUser);
        dto.setRoom(room);
        AddChatMemberDTO addlist = dto.getNewMembers();
        dto.setNewMembers(null);
        addlist.getAddMembers().forEach(id -> {
            String login = this.chatService.convertUserIdToUserLogin(id);
            if (login.equals(currentUser)){
                this.messagingTemplate.convertAndSend("/chat/"+login, dto);
            }else {
                this.messagingTemplate.convertAndSend("/chat/"+login, room);
            }
        });

    }




    @Override
    public void disconnect(SessionDisconnectEvent event) {

    }
}
