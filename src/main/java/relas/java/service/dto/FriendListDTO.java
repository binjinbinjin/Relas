package relas.java.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the FriendList entity.
 */
public class FriendListDTO implements Serializable {

    private Long id;

    private String userRelationship;

    private String remark;

    private Long userIDId;

    private String userIDLogin;

    private Long friendIDId;

    private String friendIDLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserRelationship() {
        return userRelationship;
    }

    public void setUserRelationship(String userRelationship) {
        this.userRelationship = userRelationship;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Long getUserIDId() {
        return userIDId;
    }

    public void setUserIDId(Long userId) {
        this.userIDId = userId;
    }

    public String getUserIDLogin() {
        return userIDLogin;
    }

    public void setUserIDLogin(String userLogin) {
        this.userIDLogin = userLogin;
    }

    public Long getFriendIDId() {
        return friendIDId;
    }

    public void setFriendIDId(Long userId) {
        this.friendIDId = userId;
    }

    public String getFriendIDLogin() {
        return friendIDLogin;
    }

    public void setFriendIDLogin(String userLogin) {
        this.friendIDLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FriendListDTO friendListDTO = (FriendListDTO) o;
        if(friendListDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), friendListDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FriendListDTO{" +
            "id=" + getId() +
            ", userRelationship='" + getUserRelationship() + "'" +
            ", remark='" + getRemark() + "'" +
            "}";
    }
}
