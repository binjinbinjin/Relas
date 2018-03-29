package relas.java.web.websocket.Abst;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;
import java.util.List;

public abstract class ServiceWithInitialSubscribeListener<T, E> implements ApplicationListener<SessionDisconnectEvent> {

    protected final Logger log;

    protected final SimpMessageSendingOperations messagingTemplate;

    protected final SimpUserRegistry simpUserRegistry;

    public ServiceWithInitialSubscribeListener(SimpMessageSendingOperations messagingTemplate, SimpUserRegistry defaultSimpUserRegistry, Object o) {
        this.messagingTemplate = messagingTemplate;
        this.simpUserRegistry = defaultSimpUserRegistry;
        this.log = LoggerFactory.getLogger(o.getClass());
    }



    public abstract List<T> subscribedEvent(E login, StompHeaderAccessor stompHeaderAccessor, Principal principal);


    public abstract void receivedNewMessage(T t, StompHeaderAccessor stompHeaderAccessor, Principal principal);

    public abstract void disconnect(SessionDisconnectEvent event);
    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        this.disconnect(event);
    }
}
