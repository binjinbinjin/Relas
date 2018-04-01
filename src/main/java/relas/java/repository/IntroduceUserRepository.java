package relas.java.repository;

import relas.java.domain.IntroduceUser;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;
import java.util.Optional;

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

    Optional<List<IntroduceUser>> findByIntroduceUserID_Login(String login);

    /**
     * Save a introduceUser iff no same request exist
     * - the request with different reason and time, but same users will be consider as same request
     *
     * -in the case of adding a friend the (introToUserLogin) will be same as (introByUserlogin)
     *
     * @param introUserLogin user that want to be friend
     * @param introToUserLogin intro the (introUserLogin) to that user
     * @param introByUserlogin the user that introduce a user to other
     * @return true iff exist
     */
    Optional<Boolean> existsByIntroduceUserID_LoginAndIntroduceTo_LoginAndIntroduceBy_Login(String introUserLogin, String introToUserLogin, String introByUserlogin);

    /**
     * Remove the introduce object
     *
     *
     * @param introUserLogin user that want to be friend
     * @param introToUserLogin intro the (introUserLogin) to that user
     * @return if remove return the entity, otherwise null
     */
    //NOT TEST YET
    void deleteAllByIntroduceUserID_LoginAndIntroduceTo_Login(String introUserLogin, String introToUserLogin);


}
