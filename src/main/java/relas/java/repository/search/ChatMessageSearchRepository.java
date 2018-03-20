package relas.java.repository.search;

import relas.java.domain.ChatMessage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ChatMessage entity.
 */
public interface ChatMessageSearchRepository extends ElasticsearchRepository<ChatMessage, Long> {
}
