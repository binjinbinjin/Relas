package relas.java.service.impl;

import relas.java.service.DatingRecordService;
import relas.java.domain.DatingRecord;
import relas.java.repository.DatingRecordRepository;
import relas.java.repository.search.DatingRecordSearchRepository;
import relas.java.service.dto.DatingRecordDTO;
import relas.java.service.mapper.DatingRecordMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing DatingRecord.
 */
@Service
@Transactional
public class DatingRecordServiceImpl implements DatingRecordService {

    private final Logger log = LoggerFactory.getLogger(DatingRecordServiceImpl.class);

    private final DatingRecordRepository datingRecordRepository;

    private final DatingRecordMapper datingRecordMapper;

    private final DatingRecordSearchRepository datingRecordSearchRepository;

    public DatingRecordServiceImpl(DatingRecordRepository datingRecordRepository, DatingRecordMapper datingRecordMapper, DatingRecordSearchRepository datingRecordSearchRepository) {
        this.datingRecordRepository = datingRecordRepository;
        this.datingRecordMapper = datingRecordMapper;
        this.datingRecordSearchRepository = datingRecordSearchRepository;
    }

    /**
     * Save a datingRecord.
     *
     * @param datingRecordDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DatingRecordDTO save(DatingRecordDTO datingRecordDTO) {
        log.debug("Request to save DatingRecord : {}", datingRecordDTO);
        DatingRecord datingRecord = datingRecordMapper.toEntity(datingRecordDTO);
        datingRecord = datingRecordRepository.save(datingRecord);
        DatingRecordDTO result = datingRecordMapper.toDto(datingRecord);
        datingRecordSearchRepository.save(datingRecord);
        return result;
    }

    /**
     * Get all the datingRecords.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DatingRecordDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DatingRecords");
        return datingRecordRepository.findAll(pageable)
            .map(datingRecordMapper::toDto);
    }

    /**
     * Get one datingRecord by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DatingRecordDTO findOne(Long id) {
        log.debug("Request to get DatingRecord : {}", id);
        DatingRecord datingRecord = datingRecordRepository.findOne(id);
        return datingRecordMapper.toDto(datingRecord);
    }

    /**
     * Delete the datingRecord by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DatingRecord : {}", id);
        datingRecordRepository.delete(id);
        datingRecordSearchRepository.delete(id);
    }

    /**
     * Search for the datingRecord corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DatingRecordDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of DatingRecords for query {}", query);
        Page<DatingRecord> result = datingRecordSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(datingRecordMapper::toDto);
    }
}
