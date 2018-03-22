package relas.java.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import relas.java.domain.User;
import relas.java.domain.UserPortfolio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import relas.java.domain.enumeration.GenderEnum;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the UserPortfolio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserPortfolioRepository extends JpaRepository<UserPortfolio, Long> {

    @Query("select user_portfolio from UserPortfolio user_portfolio where user_portfolio.user.login = ?#{principal.username}")
    List<UserPortfolio> findByUserIsCurrentUser();

    @Query("select user_portfolio from UserPortfolio user_portfolio where user_portfolio.userName.login = ?#{principal.username}")
    List<UserPortfolio> findByUserNameIsCurrentUser();

    /**
     * Get all the userPortfolios.
     *
     * @param user User entity
     * @return UserPortfolio of this user
     */
    Optional<UserPortfolio> findOneByUser(User user);

    /**
     * Get all the userPortfolios by specifies gender.
     *
     * @param gender gender
     * @param pageable the pagination information
     * @return Page of UserPortfolio
     */
    Page<UserPortfolio> findUserPortfolioByGender(GenderEnum gender, Pageable pageable);

    /**
     * Get the userPortfolios by specifies login
     *
     * @param login userlogin
     * @return UserPortfolio that match the login
     */
    Optional<UserPortfolio> findUserPortfolioByUserName_Login(String login);

}
