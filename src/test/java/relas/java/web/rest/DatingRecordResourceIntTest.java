package relas.java.web.rest;

import relas.java.RelasApp;

import relas.java.domain.DatingRecord;
import relas.java.domain.User;
import relas.java.domain.User;
import relas.java.repository.DatingRecordRepository;
import relas.java.service.DatingRecordService;
import relas.java.repository.search.DatingRecordSearchRepository;
import relas.java.service.dto.DatingRecordDTO;
import relas.java.service.mapper.DatingRecordMapper;
import relas.java.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static relas.java.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import relas.java.domain.enumeration.DatingProgress;
/**
 * Test class for the DatingRecordResource REST controller.
 *
 * @see DatingRecordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RelasApp.class)
public class DatingRecordResourceIntTest {

    private static final DatingProgress DEFAULT_PROGRESS = DatingProgress.L1;
    private static final DatingProgress UPDATED_PROGRESS = DatingProgress.L2;

    @Autowired
    private DatingRecordRepository datingRecordRepository;

    @Autowired
    private DatingRecordMapper datingRecordMapper;

    @Autowired
    private DatingRecordService datingRecordService;

    @Autowired
    private DatingRecordSearchRepository datingRecordSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDatingRecordMockMvc;

    private DatingRecord datingRecord;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DatingRecordResource datingRecordResource = new DatingRecordResource(datingRecordService);
        this.restDatingRecordMockMvc = MockMvcBuilders.standaloneSetup(datingRecordResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DatingRecord createEntity(EntityManager em) {
        DatingRecord datingRecord = new DatingRecord()
            .progress(DEFAULT_PROGRESS);
        // Add required entity
        User userOne = UserResourceIntTest.createEntity(em);
        em.persist(userOne);
        em.flush();
        datingRecord.setUserOne(userOne);
        // Add required entity
        User userTwo = UserResourceIntTest.createEntity(em);
        em.persist(userTwo);
        em.flush();
        datingRecord.setUserTwo(userTwo);
        return datingRecord;
    }

    @Before
    public void initTest() {
        datingRecordSearchRepository.deleteAll();
        datingRecord = createEntity(em);
    }

    @Test
    @Transactional
    public void createDatingRecord() throws Exception {
        int databaseSizeBeforeCreate = datingRecordRepository.findAll().size();

        // Create the DatingRecord
        DatingRecordDTO datingRecordDTO = datingRecordMapper.toDto(datingRecord);
        restDatingRecordMockMvc.perform(post("/api/dating-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datingRecordDTO)))
            .andExpect(status().isCreated());

        // Validate the DatingRecord in the database
        List<DatingRecord> datingRecordList = datingRecordRepository.findAll();
        assertThat(datingRecordList).hasSize(databaseSizeBeforeCreate + 1);
        DatingRecord testDatingRecord = datingRecordList.get(datingRecordList.size() - 1);
        assertThat(testDatingRecord.getProgress()).isEqualTo(DEFAULT_PROGRESS);

        // Validate the DatingRecord in Elasticsearch
        DatingRecord datingRecordEs = datingRecordSearchRepository.findOne(testDatingRecord.getId());
        assertThat(datingRecordEs).isEqualToIgnoringGivenFields(testDatingRecord);
    }

    @Test
    @Transactional
    public void createDatingRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = datingRecordRepository.findAll().size();

        // Create the DatingRecord with an existing ID
        datingRecord.setId(1L);
        DatingRecordDTO datingRecordDTO = datingRecordMapper.toDto(datingRecord);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDatingRecordMockMvc.perform(post("/api/dating-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datingRecordDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DatingRecord in the database
        List<DatingRecord> datingRecordList = datingRecordRepository.findAll();
        assertThat(datingRecordList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkProgressIsRequired() throws Exception {
        int databaseSizeBeforeTest = datingRecordRepository.findAll().size();
        // set the field null
        datingRecord.setProgress(null);

        // Create the DatingRecord, which fails.
        DatingRecordDTO datingRecordDTO = datingRecordMapper.toDto(datingRecord);

        restDatingRecordMockMvc.perform(post("/api/dating-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datingRecordDTO)))
            .andExpect(status().isBadRequest());

        List<DatingRecord> datingRecordList = datingRecordRepository.findAll();
        assertThat(datingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDatingRecords() throws Exception {
        // Initialize the database
        datingRecordRepository.saveAndFlush(datingRecord);

        // Get all the datingRecordList
        restDatingRecordMockMvc.perform(get("/api/dating-records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(datingRecord.getId().intValue())))
            .andExpect(jsonPath("$.[*].progress").value(hasItem(DEFAULT_PROGRESS.toString())));
    }

    @Test
    @Transactional
    public void getDatingRecord() throws Exception {
        // Initialize the database
        datingRecordRepository.saveAndFlush(datingRecord);

        // Get the datingRecord
        restDatingRecordMockMvc.perform(get("/api/dating-records/{id}", datingRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(datingRecord.getId().intValue()))
            .andExpect(jsonPath("$.progress").value(DEFAULT_PROGRESS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDatingRecord() throws Exception {
        // Get the datingRecord
        restDatingRecordMockMvc.perform(get("/api/dating-records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDatingRecord() throws Exception {
        // Initialize the database
        datingRecordRepository.saveAndFlush(datingRecord);
        datingRecordSearchRepository.save(datingRecord);
        int databaseSizeBeforeUpdate = datingRecordRepository.findAll().size();

        // Update the datingRecord
        DatingRecord updatedDatingRecord = datingRecordRepository.findOne(datingRecord.getId());
        // Disconnect from session so that the updates on updatedDatingRecord are not directly saved in db
        em.detach(updatedDatingRecord);
        updatedDatingRecord
            .progress(UPDATED_PROGRESS);
        DatingRecordDTO datingRecordDTO = datingRecordMapper.toDto(updatedDatingRecord);

        restDatingRecordMockMvc.perform(put("/api/dating-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datingRecordDTO)))
            .andExpect(status().isOk());

        // Validate the DatingRecord in the database
        List<DatingRecord> datingRecordList = datingRecordRepository.findAll();
        assertThat(datingRecordList).hasSize(databaseSizeBeforeUpdate);
        DatingRecord testDatingRecord = datingRecordList.get(datingRecordList.size() - 1);
        assertThat(testDatingRecord.getProgress()).isEqualTo(UPDATED_PROGRESS);

        // Validate the DatingRecord in Elasticsearch
        DatingRecord datingRecordEs = datingRecordSearchRepository.findOne(testDatingRecord.getId());
        assertThat(datingRecordEs).isEqualToIgnoringGivenFields(testDatingRecord);
    }

    @Test
    @Transactional
    public void updateNonExistingDatingRecord() throws Exception {
        int databaseSizeBeforeUpdate = datingRecordRepository.findAll().size();

        // Create the DatingRecord
        DatingRecordDTO datingRecordDTO = datingRecordMapper.toDto(datingRecord);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDatingRecordMockMvc.perform(put("/api/dating-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datingRecordDTO)))
            .andExpect(status().isCreated());

        // Validate the DatingRecord in the database
        List<DatingRecord> datingRecordList = datingRecordRepository.findAll();
        assertThat(datingRecordList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDatingRecord() throws Exception {
        // Initialize the database
        datingRecordRepository.saveAndFlush(datingRecord);
        datingRecordSearchRepository.save(datingRecord);
        int databaseSizeBeforeDelete = datingRecordRepository.findAll().size();

        // Get the datingRecord
        restDatingRecordMockMvc.perform(delete("/api/dating-records/{id}", datingRecord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean datingRecordExistsInEs = datingRecordSearchRepository.exists(datingRecord.getId());
        assertThat(datingRecordExistsInEs).isFalse();

        // Validate the database is empty
        List<DatingRecord> datingRecordList = datingRecordRepository.findAll();
        assertThat(datingRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchDatingRecord() throws Exception {
        // Initialize the database
        datingRecordRepository.saveAndFlush(datingRecord);
        datingRecordSearchRepository.save(datingRecord);

        // Search the datingRecord
        restDatingRecordMockMvc.perform(get("/api/_search/dating-records?query=id:" + datingRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(datingRecord.getId().intValue())))
            .andExpect(jsonPath("$.[*].progress").value(hasItem(DEFAULT_PROGRESS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DatingRecord.class);
        DatingRecord datingRecord1 = new DatingRecord();
        datingRecord1.setId(1L);
        DatingRecord datingRecord2 = new DatingRecord();
        datingRecord2.setId(datingRecord1.getId());
        assertThat(datingRecord1).isEqualTo(datingRecord2);
        datingRecord2.setId(2L);
        assertThat(datingRecord1).isNotEqualTo(datingRecord2);
        datingRecord1.setId(null);
        assertThat(datingRecord1).isNotEqualTo(datingRecord2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DatingRecordDTO.class);
        DatingRecordDTO datingRecordDTO1 = new DatingRecordDTO();
        datingRecordDTO1.setId(1L);
        DatingRecordDTO datingRecordDTO2 = new DatingRecordDTO();
        assertThat(datingRecordDTO1).isNotEqualTo(datingRecordDTO2);
        datingRecordDTO2.setId(datingRecordDTO1.getId());
        assertThat(datingRecordDTO1).isEqualTo(datingRecordDTO2);
        datingRecordDTO2.setId(2L);
        assertThat(datingRecordDTO1).isNotEqualTo(datingRecordDTO2);
        datingRecordDTO1.setId(null);
        assertThat(datingRecordDTO1).isNotEqualTo(datingRecordDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(datingRecordMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(datingRecordMapper.fromId(null)).isNull();
    }
}
