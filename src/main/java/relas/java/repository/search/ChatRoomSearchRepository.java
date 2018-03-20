package relas.java.repository.search;

import relas.java.domain.ChatRoom;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ChatRoom entity.
 */
public interface ChatRoomSearchRepository extends ElasticsearchRepository<ChatRoom, Long> {
}
