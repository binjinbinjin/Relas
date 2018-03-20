package relas.java.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A FriendList.
 */
@Entity
@Table(name = "friend_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "friendlist")
public class FriendList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_relationship")
    private String userRelationship;

    @Column(name = "remark")
    private String remark;

    @ManyToOne(optional = false)
    @NotNull
    private User userID;

    @ManyToOne(optional = false)
    @NotNull
    private User friendID;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserRelationship() {
        return userRelationship;
    }

    public FriendList userRelationship(String userRelationship) {
        this.userRelationship = userRelationship;
        return this;
    }

    public void setUserRelationship(String userRelationship) {
        this.userRelationship = userRelationship;
    }

    public String getRemark() {
        return remark;
    }

    public FriendList remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public User getUserID() {
        return userID;
    }

    public FriendList userID(User user) {
        this.userID = user;
        return this;
    }

    public void setUserID(User user) {
        this.userID = user;
    }

    public User getFriendID() {
        return friendID;
    }

    public FriendList friendID(User user) {
        this.friendID = user;
        return this;
    }

    public void setFriendID(User user) {
        this.friendID = user;
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
        FriendList friendList = (FriendList) o;
        if (friendList.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), friendList.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FriendList{" +
            "id=" + getId() +
            ", userRelationship='" + getUserRelationship() + "'" +
            ", remark='" + getRemark() + "'" +
            "}";
    }
}
