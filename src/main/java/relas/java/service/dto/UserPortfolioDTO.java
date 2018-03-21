package relas.java.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import relas.java.domain.enumeration.GenderEnum;

/**
 * A DTO for the UserPortfolio entity.
 */
public class UserPortfolioDTO implements Serializable {

    private Long id;

    private String displayName;

    private String description;

    private GenderEnum gender;

    @Lob
    private byte[] image;
    private String imageContentType;

    private Long userId;

    private Long userNameId;

    private String userNameLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getUserNameId() {
        return userNameId;
    }

    public void setUserNameId(Long userId) {
        this.userNameId = userId;
    }

    public String getUserNameLogin() {
        return userNameLogin;
    }

    public void setUserNameLogin(String userLogin) {
        this.userNameLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserPortfolioDTO userPortfolioDTO = (UserPortfolioDTO) o;
        if(userPortfolioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userPortfolioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserPortfolioDTO{" +
            "id=" + getId() +
            ", displayName='" + getDisplayName() + "'" +
            ", description='" + getDescription() + "'" +
            ", gender='" + getGender() + "'" +
            ", image='" + getImage() + "'" +
            "}";
    }
}
