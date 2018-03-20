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
 * A Tweet.
 */
@Entity
@Table(name = "tweet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "tweet")
public class Tweet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_time", nullable = false)
    private Instant time;

    @NotNull
    @Column(name = "message", nullable = false)
    private String message;

    @Lob
    @Column(name = "accessory")
    private byte[] accessory;

    @Column(name = "accessory_content_type")
    private String accessoryContentType;

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

    public Instant getTime() {
        return time;
    }

    public Tweet time(Instant time) {
        this.time = time;
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public String getMessage() {
        return message;
    }

    public Tweet message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public byte[] getAccessory() {
        return accessory;
    }

    public Tweet accessory(byte[] accessory) {
        this.accessory = accessory;
        return this;
    }

    public void setAccessory(byte[] accessory) {
        this.accessory = accessory;
    }

    public String getAccessoryContentType() {
        return accessoryContentType;
    }

    public Tweet accessoryContentType(String accessoryContentType) {
        this.accessoryContentType = accessoryContentType;
        return this;
    }

    public void setAccessoryContentType(String accessoryContentType) {
        this.accessoryContentType = accessoryContentType;
    }

    public User getUserID() {
        return userID;
    }

    public Tweet userID(User user) {
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
        Tweet tweet = (Tweet) o;
        if (tweet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tweet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tweet{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", message='" + getMessage() + "'" +
            ", accessory='" + getAccessory() + "'" +
            ", accessoryContentType='" + getAccessoryContentType() + "'" +
            "}";
    }
}
