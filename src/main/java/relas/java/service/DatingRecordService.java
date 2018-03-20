package relas.java.service;

import relas.java.service.dto.DatingRecordDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing DatingRecord.
 */
public interface DatingRecordService {

    /**
     * Save a datingRecord.
     *
     * @param datingRecordDTO the entity to save
     * @return the persisted entity
     */
    DatingRecordDTO save(DatingRecordDTO datingRecordDTO);

    /**
     * Get all the datingRecords.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DatingRecordDTO> findAll(Pageable pageable);

    /**
     * Get the "id" datingRecord.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DatingRecordDTO findOne(Long id);

    /**
     * Delete the "id" datingRecord.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the datingRecord corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DatingRecordDTO> search(String query, Pageable pageable);
}
