package relas.java.web.websocket.error;

import java.net.URI;

public final class ErrorConstants {
    public static final String PROBLEM_BASE_URL = "/RELAS/problems";
    public static final URI SUBSCRIBE_OTHER_USER_SOURCE = URI.create(PROBLEM_BASE_URL + "/cannot-subscribe-unauthenticated-source");
}
