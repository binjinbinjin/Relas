package relas.java.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import relas.java.domain.enumeration.DatingProgress;

/**
 * A DTO for the DatingRecord entity.
 */
public class DatingRecordDTO implements Serializable {

    private Long id;

    @NotNull
    private DatingProgress progress;

    private Long userOneId;

    private String userOneLogin;

    private Long userTwoId;

    private String userTwoLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DatingProgress getProgress() {
        return progress;
    }

    public void setProgress(DatingProgress progress) {
        this.progress = progress;
    }

    public Long getUserOneId() {
        return userOneId;
    }

    public void setUserOneId(Long userId) {
        this.userOneId = userId;
    }

    public String getUserOneLogin() {
        return userOneLogin;
    }

    public void setUserOneLogin(String userLogin) {
        this.userOneLogin = userLogin;
    }

    public Long getUserTwoId() {
        return userTwoId;
    }

    public void setUserTwoId(Long userId) {
        this.userTwoId = userId;
    }

    public String getUserTwoLogin() {
        return userTwoLogin;
    }

    public void setUserTwoLogin(String userLogin) {
        this.userTwoLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DatingRecordDTO datingRecordDTO = (DatingRecordDTO) o;
        if(datingRecordDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), datingRecordDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DatingRecordDTO{" +
            "id=" + getId() +
            ", progress='" + getProgress() + "'" +
            "}";
    }
}
