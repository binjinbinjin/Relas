package relas.java.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A ChatMessage.
 */
@Entity
@Table(name = "chat_message")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "chatmessage")
public class ChatMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_time", nullable = false)
    private Instant time;

    @Column(name = "message")
    private String message;

    @Lob
    @Column(name = "accessory")
    private byte[] accessory;

    @Column(name = "accessory_content_type")
    private String accessoryContentType;

    @ManyToOne(optional = false)
    @NotNull
    private ChatRoom chatID;

    @ManyToOne(optional = false)
    @NotNull
    private User messageSender;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTime() {
        return time;
    }

    public ChatMessage time(Instant time) {
        this.time = time;
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public String getMessage() {
        return message;
    }

    public ChatMessage message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public byte[] getAccessory() {
        return accessory;
    }

    public ChatMessage accessory(byte[] accessory) {
        this.accessory = accessory;
        return this;
    }

    public void setAccessory(byte[] accessory) {
        this.accessory = accessory;
    }

    public String getAccessoryContentType() {
        return accessoryContentType;
    }

    public ChatMessage accessoryContentType(String accessoryContentType) {
        this.accessoryContentType = accessoryContentType;
        return this;
    }

    public void setAccessoryContentType(String accessoryContentType) {
        this.accessoryContentType = accessoryContentType;
    }

    public ChatRoom getChatID() {
        return chatID;
    }

    public ChatMessage chatID(ChatRoom chatRoom) {
        this.chatID = chatRoom;
        return this;
    }

    public void setChatID(ChatRoom chatRoom) {
        this.chatID = chatRoom;
    }

    public User getMessageSender() {
        return messageSender;
    }

    public ChatMessage messageSender(User user) {
        this.messageSender = user;
        return this;
    }

    public void setMessageSender(User user) {
        this.messageSender = user;
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
        ChatMessage chatMessage = (ChatMessage) o;
        if (chatMessage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chatMessage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", message='" + getMessage() + "'" +
            ", accessory='" + getAccessory() + "'" +
            ", accessoryContentType='" + getAccessoryContentType() + "'" +
            "}";
    }
}
