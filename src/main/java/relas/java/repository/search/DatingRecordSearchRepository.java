package relas.java.repository.search;

import relas.java.domain.DatingRecord;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DatingRecord entity.
 */
public interface DatingRecordSearchRepository extends ElasticsearchRepository<DatingRecord, Long> {
}
