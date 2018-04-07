package relas.java.web.websocket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import relas.java.service.ChatService;
import relas.java.service.dto.ChatMessageDTO;
import relas.java.service.dto.ChatRoomMemberDTO;
import relas.java.service.dto.UnreadChatMessageDTO;
import relas.java.web.websocket.Abst.ServiceWithInitialSubscribeListener;
import relas.java.web.websocket.dto.AddChatMemberDTO;
import relas.java.web.websocket.dto.NewChtRoomDTO;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.LinkedList;
import java.util.List;

@MessageMapping("/chat")
public class Chat extends ServiceWithInitialSubscribeListener{

    private final ChatService chatService;
    public Chat(SimpMessageSendingOperations messagingTemplate, SimpUserRegistry defaultSimpUserRegistry, ChatService chatService) {
        super(messagingTemplate, defaultSimpUserRegistry, Chat.class);
        this.chatService = chatService;
    }

    @SubscribeMapping("/{login}")
    @SendTo("/chat/{login}")
    public UnreadChatMessageDTO subscribeChat(@NotNull @DestinationVariable String login, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        this.authenticatedCheck(stompHeaderAccessor, principal, login);
        return null;
    }

    @MessageMapping("new/message")
    public void newMessage(@NotNull @Payload ChatMessageDTO dto) {
       List<ChatRoomMemberDTO> members = this.chatService.getChatRoomMember(dto.getChatIDId());
       List<Long> userId = new LinkedList<>();
       List<String> userLogin = new LinkedList<>();
       members.forEach(each -> {
           if (each.getMemberIDId() == dto.getMessageSenderId())
               return;
           userId.add(each.getMemberIDId());
           userLogin.add(each.getMemberIDLogin());
       });
       ChatMessageDTO savedMessage = this.chatService.newMessage(dto);
       this.chatService.saveAsUnreadMessage(userId, savedMessage);
       userLogin.forEach(each -> {
           this.messagingTemplate.convertAndSend("/chat/" + each, savedMessage);
       });
    }

    @MessageMapping("add/member")
    public void addChatMembers(@NotNull @Payload AddChatMemberDTO dto){
        if (!this.chatService.addUsersToChatRoom(dto.getChatId(), dto.getAddMembers()))
            return;
        NewChtRoomDTO chatRoom = new NewChtRoomDTO();
        chatRoom.setChatId(dto.getChatId());
        dto.getAddMembers().forEach(login -> {
            this.messagingTemplate.convertAndSend("/chat/"+login, chatRoom);
        });
    }

    @Override
    public void disconnect(SessionDisconnectEvent event) {

    }
}
