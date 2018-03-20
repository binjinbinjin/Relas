package relas.java.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the ChatMessage entity.
 */
public class ChatMessageDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant time;

    private String message;

    @Lob
    private byte[] accessory;
    private String accessoryContentType;

    private Long chatIDId;

    private String chatIDChatID;

    private Long messageSenderId;

    private String messageSenderLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTime() {
        return time;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public byte[] getAccessory() {
        return accessory;
    }

    public void setAccessory(byte[] accessory) {
        this.accessory = accessory;
    }

    public String getAccessoryContentType() {
        return accessoryContentType;
    }

    public void setAccessoryContentType(String accessoryContentType) {
        this.accessoryContentType = accessoryContentType;
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

    public Long getMessageSenderId() {
        return messageSenderId;
    }

    public void setMessageSenderId(Long userId) {
        this.messageSenderId = userId;
    }

    public String getMessageSenderLogin() {
        return messageSenderLogin;
    }

    public void setMessageSenderLogin(String userLogin) {
        this.messageSenderLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ChatMessageDTO chatMessageDTO = (ChatMessageDTO) o;
        if(chatMessageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chatMessageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChatMessageDTO{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", message='" + getMessage() + "'" +
            ", accessory='" + getAccessory() + "'" +
            "}";
    }
}
