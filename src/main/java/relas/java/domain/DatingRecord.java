package relas.java.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import relas.java.domain.enumeration.DatingProgress;

/**
 * A DatingRecord.
 */
@Entity
@Table(name = "dating_record")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "datingrecord")
public class DatingRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "progress", nullable = false)
    private DatingProgress progress;

    @ManyToOne(optional = false)
    @NotNull
    private User userOne;

    @ManyToOne(optional = false)
    @NotNull
    private User userTwo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DatingProgress getProgress() {
        return progress;
    }

    public DatingRecord progress(DatingProgress progress) {
        this.progress = progress;
        return this;
    }

    public void setProgress(DatingProgress progress) {
        this.progress = progress;
    }

    public User getUserOne() {
        return userOne;
    }

    public DatingRecord userOne(User user) {
        this.userOne = user;
        return this;
    }

    public void setUserOne(User user) {
        this.userOne = user;
    }

    public User getUserTwo() {
        return userTwo;
    }

    public DatingRecord userTwo(User user) {
        this.userTwo = user;
        return this;
    }

    public void setUserTwo(User user) {
        this.userTwo = user;
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
        DatingRecord datingRecord = (DatingRecord) o;
        if (datingRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), datingRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DatingRecord{" +
            "id=" + getId() +
            ", progress='" + getProgress() + "'" +
            "}";
    }
}
