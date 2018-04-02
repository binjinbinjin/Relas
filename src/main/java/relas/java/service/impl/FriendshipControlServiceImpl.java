package relas.java.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import relas.java.service.FriendListService;
import relas.java.service.FriendshipControlService;
import relas.java.service.IntroduceUserService;
import relas.java.service.UserService;
import relas.java.service.dto.FriendListDTO;

@Service
@Transactional
public class FriendshipControlServiceImpl implements FriendshipControlService{

    private final IntroduceUserService introduceUserService;

    private final FriendListService friendListService;

    private final UserService userService;

    public FriendshipControlServiceImpl(final IntroduceUserService introduceUserService, FriendListService friendListService, UserService userService){
        this.introduceUserService = introduceUserService;
        this.friendListService = friendListService;
        this.userService = userService;
    }

    /**
     * Accept a add userRequest
     *
     * @param requstSender
     * @param requestTo
     * @return null if add fail, otherwise a array with index 0 requstSender FriendListDTO
     *         index 1 requstTo FriendListDTO
     */
    @Override
    public FriendListDTO[] acceptRequest(String requstSender, String requestTo, String relationship) {
        this.introduceUserService.removeIntroduceUser(requstSender, requestTo);
        if( this.friendListService.friendshipCheck(requestTo, requstSender))
            return null;

        FriendListDTO dtoA = new FriendListDTO();
        FriendListDTO dtoB = new FriendListDTO();
        long idA = this.userService.getUserWithAuthoritiesByLogin(requstSender).get().getId();
        long idB = this.userService.getUserWithAuthoritiesByLogin(requestTo).get().getId();
        dtoA.setUserRelationship(relationship);
        dtoB.setUserRelationship(relationship);
        dtoA.setFriendIDId(idA);
        dtoA.setUserIDId(idB);
        dtoB.setFriendIDId(idB);
        dtoB.setUserIDId(idA);
        dtoA = this.friendListService.save(dtoA);
        dtoB  = this.friendListService.save(dtoB);
        dtoA.setFriendIDLogin(requstSender);
        dtoA.setUserIDLogin(requestTo);
        dtoB.setFriendIDLogin(requestTo);
        dtoB.setUserIDLogin(requstSender);
        return new FriendListDTO[]{dtoB, dtoA};
    }
}
