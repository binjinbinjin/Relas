package relas.java.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ChatRoomMember entity.
 */
public class ChatRoomMemberDTO implements Serializable {

    private Long id;

    private Long chatIDId;

    private String chatIDChatID;

    private Long memberIDId;

    private String memberIDLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getChatIDId() {
        return chatIDId;
    }

    public void setChatIDId(Long chatRoomId) {
        this.chatIDId = chatRoomId;
    }

    public String getChatIDChatID() {
        return chatIDChatID;
    }

    public void setChatIDChatID(String chatRoomChatID) {
        this.chatIDChatID = chatRoomChatID;
    }

    public Long getMemberIDId() {
        return memberIDId;
    }

    public void setMemberIDId(Long userId) {
        this.memberIDId = userId;
    }

    public String getMemberIDLogin() {
        return memberIDLogin;
    }

    public void setMemberIDLogin(String userLogin) {
        this.memberIDLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ChatRoomMemberDTO chatRoomMemberDTO = (ChatRoomMemberDTO) o;
        if(chatRoomMemberDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chatRoomMemberDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChatRoomMemberDTO{" +
            "id=" + getId() +
            "}";
    }
}
