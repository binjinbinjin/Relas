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
import relas.java.web.websocket.Abst.ServiceWithInitialSubscribeListener;
import relas.java.web.websocket.dto.FriendshipControlDTO;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.List;

@Controller
@MessageMapping("/friendshipControl")
public class FriendshipControlService extends ServiceWithInitialSubscribeListener<FriendshipControlDTO, String>{

    private final IntroduceUserService introduceUserService;
    public FriendshipControlService(SimpMessageSendingOperations messagingTemplate,
                                    SimpUserRegistry defaultSimpUserRegistry,
                                    IntroduceUserService introduceUserService) {
        super(messagingTemplate, defaultSimpUserRegistry, FriendRequestService.class);
        this.introduceUserService = introduceUserService;
    }

    @SubscribeMapping("/{login}")
    @SendTo("/friendshipControl/{login}")
    public List<FriendshipControlDTO> subscribedEvent(@NotNull @DestinationVariable String login, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        this.authenticatedCheck(stompHeaderAccessor, principal, login);
        log.debug("User subscribe friendship control, login: {}", login);
        return null;
    }

    @MessageMapping("/add")
    public void addFriend(FriendshipControlDTO dto, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        log.debug("user {} add friend {}", dto.getUserLogin(), dto.getTargetLogin());
        this.introduceUserService.removeIntroduceUser(dto.getUserLogin(), dto.getTargetLogin());

        // not finish yet
    }

    @Override
    public void disconnect(SessionDisconnectEvent event) {

    }
}
