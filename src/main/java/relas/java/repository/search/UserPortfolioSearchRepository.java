package relas.java.repository.search;

import relas.java.domain.UserPortfolio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UserPortfolio entity.
 */
public interface UserPortfolioSearchRepository extends ElasticsearchRepository<UserPortfolio, Long> {
}
