package relas.java.repository;

import relas.java.domain.IntroduceUser;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the IntroduceUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IntroduceUserRepository extends JpaRepository<IntroduceUser, Long> {

    @Query("select introduce_user from IntroduceUser introduce_user where introduce_user.introduceBy.login = ?#{principal.username}")
    List<IntroduceUser> findByIntroduceByIsCurrentUser();

    @Query("select introduce_user from IntroduceUser introduce_user where introduce_user.introduceTo.login = ?#{principal.username}")
    List<IntroduceUser> findByIntroduceToIsCurrentUser();

    @Query("select introduce_user from IntroduceUser introduce_user where introduce_user.introduceUserID.login = ?#{principal.username}")
    List<IntroduceUser> findByIntroduceUserIDIsCurrentUser();

}
