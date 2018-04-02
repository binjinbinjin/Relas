package relas.java.web.websocket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import relas.java.service.IntroduceUserService;
import relas.java.service.dto.FriendListDTO;
import relas.java.web.websocket.Abst.ServiceWithInitialSubscribeListener;
import relas.java.web.websocket.dto.FriendshipControlDTO;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.List;

@Controller
public class FriendshipControlService extends ServiceWithInitialSubscribeListener{

    private final relas.java.service.FriendshipControlService friendshipControlService;
    public FriendshipControlService(SimpMessageSendingOperations messagingTemplate,
                                    SimpUserRegistry defaultSimpUserRegistry,
                                    relas.java.service.FriendshipControlService friendshipControlService) {
        super(messagingTemplate, defaultSimpUserRegistry, FriendRequestService.class);
        this.friendshipControlService = friendshipControlService;
    }

    @SubscribeMapping("/friendshipControl/{login}")
    @SendTo("/friendshipControl/{login}")
    public List<FriendListDTO> subscribedEvent(@NotNull @DestinationVariable String login, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        this.authenticatedCheck(stompHeaderAccessor, principal, login);
        log.debug("User subscribe friendship control, login: {}", login);
        return this.friendshipControlService.getAllFriend(login);
    }

    @MessageMapping("/friendshipControl/add")
    public void addFriend(FriendshipControlDTO dto, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        log.debug("user {} add friend {}", dto.getUserLogin(), dto.getTargetLogin());
        FriendListDTO[] addResult = this.friendshipControlService.acceptRequest(dto.getUserLogin(), dto.getTargetLogin(), "Friend");
        if (addResult == null || addResult.length != 2) {
            log.debug("Add friend fail ");
            return;
        }

        log.debug("add friend success: return user  {}: {} user  {}: {}",addResult[0].getUserIDLogin(), addResult[0], addResult[1].getUserIDLogin(), addResult[1]);
        this.messagingTemplate.convertAndSend("/friendshipControl/"+addResult[0].getUserIDLogin(), addResult[0] );
        this.messagingTemplate.convertAndSend("/friendshipControl/"+addResult[1].getUserIDLogin(), addResult[1] );
        // not finish yet
    }

    @Override
    public void disconnect(SessionDisconnectEvent event) {

    }
}
