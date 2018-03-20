package relas.java.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Tweet entity.
 */
public class TweetDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant time;

    @NotNull
    private String message;

    @Lob
    private byte[] accessory;
    private String accessoryContentType;

    private Long userIDId;

    private String userIDLogin;

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

        TweetDTO tweetDTO = (TweetDTO) o;
        if(tweetDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tweetDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TweetDTO{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", message='" + getMessage() + "'" +
            ", accessory='" + getAccessory() + "'" +
            "}";
    }
}
