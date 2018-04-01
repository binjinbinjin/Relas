package relas.java.web.websocket.dto;

import relas.java.web.websocket.dto.enumeration.FriendshipControlEnum;

public class FriendshipControlDTO {
    private FriendshipControlEnum action;
    private String userLogin;
    private String targetLogin;

    public FriendshipControlEnum getAction() {
        return action;
    }

    public void setAction(FriendshipControlEnum action) {
        this.action = action;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public String getTargetLogin() {
        return targetLogin;
    }

    public void setTargetLogin(String targetLogin) {
        this.targetLogin = targetLogin;
    }

    @Override
    public String toString() {
        return "FriendshipControlDTO{" +
            "action=" + action +
            ", userLogin='" + userLogin + '\'' +
            ", targetLogin='" + targetLogin + '\'' +
            '}';
    }
}
