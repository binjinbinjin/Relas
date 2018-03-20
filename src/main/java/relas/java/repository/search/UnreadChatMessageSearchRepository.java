package relas.java.repository.search;

import relas.java.domain.UnreadChatMessage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UnreadChatMessage entity.
 */
public interface UnreadChatMessageSearchRepository extends ElasticsearchRepository<UnreadChatMessage, Long> {
}
