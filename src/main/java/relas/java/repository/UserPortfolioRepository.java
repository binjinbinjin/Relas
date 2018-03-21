package relas.java.repository;

import relas.java.domain.User;
import relas.java.domain.UserPortfolio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
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

    Optional<UserPortfolio> findOneByUser(User user);

}
