package relas.java.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import relas.java.domain.enumeration.IntroduceUserReason;

/**
 * A DTO for the IntroduceUser entity.
 */
public class IntroduceUserDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant time;

    @NotNull
    private IntroduceUserReason reason;

    private Long introduceById;

    private String introduceByLogin;

    private Long introduceToId;

    private String introduceToLogin;

    private Long introduceUserIDId;

    private String introduceUserIDLogin;

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

    public IntroduceUserReason getReason() {
        return reason;
    }

    public void setReason(IntroduceUserReason reason) {
        this.reason = reason;
    }

    public Long getIntroduceById() {
        return introduceById;
    }

    public void setIntroduceById(Long userId) {
        this.introduceById = userId;
    }

    public String getIntroduceByLogin() {
        return introduceByLogin;
    }

    public void setIntroduceByLogin(String userLogin) {
        this.introduceByLogin = userLogin;
    }

    public Long getIntroduceToId() {
        return introduceToId;
    }

    public void setIntroduceToId(Long userId) {
        this.introduceToId = userId;
    }

    public String getIntroduceToLogin() {
        return introduceToLogin;
    }

    public void setIntroduceToLogin(String userLogin) {
        this.introduceToLogin = userLogin;
    }

    public Long getIntroduceUserIDId() {
        return introduceUserIDId;
    }

    public void setIntroduceUserIDId(Long userId) {
        this.introduceUserIDId = userId;
    }

    public String getIntroduceUserIDLogin() {
        return introduceUserIDLogin;
    }

    public void setIntroduceUserIDLogin(String userLogin) {
        this.introduceUserIDLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        IntroduceUserDTO introduceUserDTO = (IntroduceUserDTO) o;
        if(introduceUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), introduceUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IntroduceUserDTO{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", reason='" + getReason() + "'" +
            "}";
    }
}
