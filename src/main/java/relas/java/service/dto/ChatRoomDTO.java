package relas.java.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ChatRoom entity.
 */
public class ChatRoomDTO implements Serializable {

    private Long id;

    @NotNull
    private Long chatID;

    @NotNull
    private Integer maxMember;

    private String chatRoomName;

    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getChatID() {
        return chatID;
    }

    public void setChatID(Long chatID) {
        this.chatID = chatID;
    }

    public Integer getMaxMember() {
        return maxMember;
    }

    public void setMaxMember(Integer maxMember) {
        this.maxMember = maxMember;
    }

    public String getChatRoomName() {
        return chatRoomName;
    }

    public void setChatRoomName(String chatRoomName) {
        this.chatRoomName = chatRoomName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ChatRoomDTO chatRoomDTO = (ChatRoomDTO) o;
        if(chatRoomDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chatRoomDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChatRoomDTO{" +
            "id=" + getId() +
            ", chatID=" + getChatID() +
            ", maxMember=" + getMaxMember() +
            ", chatRoomName='" + getChatRoomName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
