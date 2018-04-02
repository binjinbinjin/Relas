package relas.java.service;

import relas.java.domain.UserPortfolio;
import relas.java.service.dto.FriendListDTO;

public interface FriendshipControlService {

    /**
     * Accept a add userRequest
     *
     * @param requstSender
     * @param requestTo
     * @return null if add fail, otherwise a array with index 0 requstSender FriendListDTO
     *         index 1 requstTo FriendListDTO
     */
    FriendListDTO[] acceptRequest(String requstSender, String requestTo, String relationship);

}
