package relas.java.service;

import relas.java.domain.UserPortfolio;

public interface FriendshipControlService {

    /**
     * Accept a add userRequest
     * @param requstSender
     * @param requestTo
     */
   void acceptRequest(String requstSender, String requestTo);

}
