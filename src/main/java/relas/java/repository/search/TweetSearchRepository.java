package relas.java.repository.search;

import relas.java.domain.Tweet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Tweet entity.
 */
public interface TweetSearchRepository extends ElasticsearchRepository<Tweet, Long> {
}
