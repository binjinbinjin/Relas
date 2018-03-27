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
import relas.java.config.Constants;
import relas.java.service.IntroduceUserService;
import relas.java.service.dto.IntroduceUserDTO;
import relas.java.web.websocket.Abst.ServiceWithInitialSubscribeListener;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.security.Principal;

@Controller
public class FriendRequestService extends ServiceWithInitialSubscribeListener<IntroduceUserDTO, String> {


    private final IntroduceUserService introduceUserService;
    public FriendRequestService(SimpMessageSendingOperations messagingTemplate, SimpUserRegistry defaultSimpUserRegistry, IntroduceUserService introduceUserService) {
        super(messagingTemplate, defaultSimpUserRegistry, FriendRequestService.class);
        this.introduceUserService = introduceUserService;
    }

    @SubscribeMapping("/addFriend/{login}")
    public void subscribedEvent(@DestinationVariable String login, StompHeaderAccessor stompHeaderAccessor, Principal principal) {

        log.debug("User subscribed the add friend {}", login);
    }

    @MessageMapping("/addFriend/req")
    public void receivedNewMessage(@NotNull @Payload IntroduceUserDTO dto, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        //adding new friend
        log.debug("Received a add friend request", dto);
        if (dto.getIntroduceByLogin().equals(dto.getIntroduceToLogin())) {
            this.introduceUserService.save(dto);
            if(this.simpUserRegistry.getUser(dto.getIntroduceUserIDLogin()) == null)
                return;
           this.messagingTemplate.convertAndSend("/addFriend/"+dto.getIntroduceUserIDLogin(), dto);

        }
        // add logic for introduce a friend to other in here
    }



    @Override
    public void newSubcriber(SessionDisconnectEvent event) {

    }


}
