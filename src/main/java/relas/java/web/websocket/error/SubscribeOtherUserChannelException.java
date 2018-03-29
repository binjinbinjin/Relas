package relas.java.web.websocket.error;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class SubscribeOtherUserChannelException extends AbstractThrowableProblem {

    public SubscribeOtherUserChannelException(String subscriber) {
        super(ErrorConstants.SUBSCRIBE_OTHER_USER_SOURCE, subscriber, Status.NOT_ACCEPTABLE, "Can not subscribe other user's data source");
    }
}
