package relas.java.repository.search;

import relas.java.domain.ChatRoomMember;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ChatRoomMember entity.
 */
public interface ChatRoomMemberSearchRepository extends ElasticsearchRepository<ChatRoomMember, Long> {
}
