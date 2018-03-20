package relas.java.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the UnreadChatMessage entity.
 */
public class UnreadChatMessageDTO implements Serializable {

    private Long id;

    private Long messageId;

    private Long userIDId;

    private String userIDLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long chatMessageId) {
        this.messageId = chatMessageId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UnreadChatMessageDTO unreadChatMessageDTO = (UnreadChatMessageDTO) o;
        if(unreadChatMessageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), unreadChatMessageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UnreadChatMessageDTO{" +
            "id=" + getId() +
            "}";
    }
}
