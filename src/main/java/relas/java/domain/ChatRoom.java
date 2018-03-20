package relas.java.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ChatRoom.
 */
@Entity
@Table(name = "chat_room")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "chatroom")
public class ChatRoom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "chat_id", nullable = false)
    private Long chatID;

    @NotNull
    @Column(name = "max_member", nullable = false)
    private Integer maxMember;

    @Column(name = "chat_room_name")
    private String chatRoomName;

    @Column(name = "description")
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getChatID() {
        return chatID;
    }

    public ChatRoom chatID(Long chatID) {
        this.chatID = chatID;
        return this;
    }

    public void setChatID(Long chatID) {
        this.chatID = chatID;
    }

    public Integer getMaxMember() {
        return maxMember;
    }

    public ChatRoom maxMember(Integer maxMember) {
        this.maxMember = maxMember;
        return this;
    }

    public void setMaxMember(Integer maxMember) {
        this.maxMember = maxMember;
    }

    public String getChatRoomName() {
        return chatRoomName;
    }

    public ChatRoom chatRoomName(String chatRoomName) {
        this.chatRoomName = chatRoomName;
        return this;
    }

    public void setChatRoomName(String chatRoomName) {
        this.chatRoomName = chatRoomName;
    }

    public String getDescription() {
        return description;
    }

    public ChatRoom description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChatRoom chatRoom = (ChatRoom) o;
        if (chatRoom.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chatRoom.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChatRoom{" +
            "id=" + getId() +
            ", chatID=" + getChatID() +
            ", maxMember=" + getMaxMember() +
            ", chatRoomName='" + getChatRoomName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
