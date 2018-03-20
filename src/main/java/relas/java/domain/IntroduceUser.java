package relas.java.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import relas.java.domain.enumeration.IntroduceUserReason;

/**
 * A IntroduceUser.
 */
@Entity
@Table(name = "introduce_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "introduceuser")
public class IntroduceUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_time", nullable = false)
    private Instant time;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "reason", nullable = false)
    private IntroduceUserReason reason;

    @ManyToOne(optional = false)
    @NotNull
    private User introduceBy;

    @ManyToOne(optional = false)
    @NotNull
    private User introduceTo;

    @ManyToOne(optional = false)
    @NotNull
    private User introduceUserID;

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

    public IntroduceUser time(Instant time) {
        this.time = time;
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public IntroduceUserReason getReason() {
        return reason;
    }

    public IntroduceUser reason(IntroduceUserReason reason) {
        this.reason = reason;
        return this;
    }

    public void setReason(IntroduceUserReason reason) {
        this.reason = reason;
    }

    public User getIntroduceBy() {
        return introduceBy;
    }

    public IntroduceUser introduceBy(User user) {
        this.introduceBy = user;
        return this;
    }

    public void setIntroduceBy(User user) {
        this.introduceBy = user;
    }

    public User getIntroduceTo() {
        return introduceTo;
    }

    public IntroduceUser introduceTo(User user) {
        this.introduceTo = user;
        return this;
    }

    public void setIntroduceTo(User user) {
        this.introduceTo = user;
    }

    public User getIntroduceUserID() {
        return introduceUserID;
    }

    public IntroduceUser introduceUserID(User user) {
        this.introduceUserID = user;
        return this;
    }

    public void setIntroduceUserID(User user) {
        this.introduceUserID = user;
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
        IntroduceUser introduceUser = (IntroduceUser) o;
        if (introduceUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), introduceUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IntroduceUser{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", reason='" + getReason() + "'" +
            "}";
    }
}
