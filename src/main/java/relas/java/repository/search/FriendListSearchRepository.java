package relas.java.repository.search;

import relas.java.domain.FriendList;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FriendList entity.
 */
public interface FriendListSearchRepository extends ElasticsearchRepository<FriendList, Long> {
}
