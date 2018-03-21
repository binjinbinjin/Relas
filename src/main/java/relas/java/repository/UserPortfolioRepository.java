package relas.java.repository;

import relas.java.domain.UserPortfolio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the UserPortfolio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserPortfolioRepository extends JpaRepository<UserPortfolio, Long> {

    @Query("select user_portfolio from UserPortfolio user_portfolio where user_portfolio.user.login = ?#{principal.username}")
    List<UserPortfolio> findByUserIsCurrentUser();

}
