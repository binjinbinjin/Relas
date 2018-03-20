package relas.java.web.rest;

import com.codahale.metrics.annotation.Timed;
import relas.java.service.DatingRecordService;
import relas.java.web.rest.errors.BadRequestAlertException;
import relas.java.web.rest.util.HeaderUtil;
import relas.java.web.rest.util.PaginationUtil;
import relas.java.service.dto.DatingRecordDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing DatingRecord.
 */
@RestController
@RequestMapping("/api")
public class DatingRecordResource {

    private final Logger log = LoggerFactory.getLogger(DatingRecordResource.class);

    private static final String ENTITY_NAME = "datingRecord";

    private final DatingRecordService datingRecordService;

    public DatingRecordResource(DatingRecordService datingRecordService) {
        this.datingRecordService = datingRecordService;
    }

    /**
     * POST  /dating-records : Create a new datingRecord.
     *
     * @param datingRecordDTO the datingRecordDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new datingRecordDTO, or with status 400 (Bad Request) if the datingRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dating-records")
    @Timed
    public ResponseEntity<DatingRecordDTO> createDatingRecord(@Valid @RequestBody DatingRecordDTO datingRecordDTO) throws URISyntaxException {
        log.debug("REST request to save DatingRecord : {}", datingRecordDTO);
        if (datingRecordDTO.getId() != null) {
            throw new BadRequestAlertException("A new datingRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DatingRecordDTO result = datingRecordService.save(datingRecordDTO);
        return ResponseEntity.created(new URI("/api/dating-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dating-records : Updates an existing datingRecord.
     *
     * @param datingRecordDTO the datingRecordDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated datingRecordDTO,
     * or with status 400 (Bad Request) if the datingRecordDTO is not valid,
     * or with status 500 (Internal Server Error) if the datingRecordDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dating-records")
    @Timed
    public ResponseEntity<DatingRecordDTO> updateDatingRecord(@Valid @RequestBody DatingRecordDTO datingRecordDTO) throws URISyntaxException {
        log.debug("REST request to update DatingRecord : {}", datingRecordDTO);
        if (datingRecordDTO.getId() == null) {
            return createDatingRecord(datingRecordDTO);
        }
        DatingRecordDTO result = datingRecordService.save(datingRecordDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, datingRecordDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dating-records : get all the datingRecords.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of datingRecords in body
     */
    @GetMapping("/dating-records")
    @Timed
    public ResponseEntity<List<DatingRecordDTO>> getAllDatingRecords(Pageable pageable) {
        log.debug("REST request to get a page of DatingRecords");
        Page<DatingRecordDTO> page = datingRecordService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/dating-records");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /dating-records/:id : get the "id" datingRecord.
     *
     * @param id the id of the datingRecordDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the datingRecordDTO, or with status 404 (Not Found)
     */
    @GetMapping("/dating-records/{id}")
    @Timed
    public ResponseEntity<DatingRecordDTO> getDatingRecord(@PathVariable Long id) {
        log.debug("REST request to get DatingRecord : {}", id);
        DatingRecordDTO datingRecordDTO = datingRecordService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(datingRecordDTO));
    }

    /**
     * DELETE  /dating-records/:id : delete the "id" datingRecord.
     *
     * @param id the id of the datingRecordDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dating-records/{id}")
    @Timed
    public ResponseEntity<Void> deleteDatingRecord(@PathVariable Long id) {
        log.debug("REST request to delete DatingRecord : {}", id);
        datingRecordService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/dating-records?query=:query : search for the datingRecord corresponding
     * to the query.
     *
     * @param query the query of the datingRecord search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/dating-records")
    @Timed
    public ResponseEntity<List<DatingRecordDTO>> searchDatingRecords(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of DatingRecords for query {}", query);
        Page<DatingRecordDTO> page = datingRecordService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/dating-records");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
