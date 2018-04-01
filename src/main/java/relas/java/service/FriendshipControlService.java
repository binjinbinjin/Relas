package relas.java.service;

import relas.java.domain.UserPortfolio;
import relas.java.service.dto.FriendListDTO;

public interface FriendshipControlService {

    /**
     * Accept a add userRequest
     * @param requstSender
     * @param requestTo
     */
    FriendListDTO[] acceptRequest(String requstSender, String requestTo, String relationship);

}
