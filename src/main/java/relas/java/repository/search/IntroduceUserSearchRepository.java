package relas.java.repository.search;

import relas.java.domain.IntroduceUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the IntroduceUser entity.
 */
public interface IntroduceUserSearchRepository extends ElasticsearchRepository<IntroduceUser, Long> {
}
