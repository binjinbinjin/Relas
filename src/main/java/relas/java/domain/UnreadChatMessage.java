package relas.java.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UnreadChatMessage.
 */
@Entity
@Table(name = "unread_chat_message")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "unreadchatmessage")
public class UnreadChatMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    private ChatMessage message;

    @ManyToOne(optional = false)
    @NotNull
    private User userID;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ChatMessage getMessage() {
        return message;
    }

    public UnreadChatMessage message(ChatMessage chatMessage) {
        this.message = chatMessage;
        return this;
    }

    public void setMessage(ChatMessage chatMessage) {
        this.message = chatMessage;
    }

    public User getUserID() {
        return userID;
    }

    public UnreadChatMessage userID(User user) {
        this.userID = user;
        return this;
    }

    public void setUserID(User user) {
        this.userID = user;
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
        UnreadChatMessage unreadChatMessage = (UnreadChatMessage) o;
        if (unreadChatMessage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), unreadChatMessage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UnreadChatMessage{" +
            "id=" + getId() +
            "}";
    }
}
