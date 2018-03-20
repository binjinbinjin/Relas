package relas.java.web.rest;

import relas.java.RelasApp;

import relas.java.domain.IntroduceUser;
import relas.java.domain.User;
import relas.java.domain.User;
import relas.java.domain.User;
import relas.java.repository.IntroduceUserRepository;
import relas.java.service.IntroduceUserService;
import relas.java.repository.search.IntroduceUserSearchRepository;
import relas.java.service.dto.IntroduceUserDTO;
import relas.java.service.mapper.IntroduceUserMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static relas.java.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import relas.java.domain.enumeration.IntroduceUserReason;
/**
 * Test class for the IntroduceUserResource REST controller.
 *
 * @see IntroduceUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RelasApp.class)
public class IntroduceUserResourceIntTest {

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final IntroduceUserReason DEFAULT_REASON = IntroduceUserReason.FRIEND;
    private static final IntroduceUserReason UPDATED_REASON = IntroduceUserReason.COLLEAGUE;

    @Autowired
    private IntroduceUserRepository introduceUserRepository;

    @Autowired
    private IntroduceUserMapper introduceUserMapper;

    @Autowired
    private IntroduceUserService introduceUserService;

    @Autowired
    private IntroduceUserSearchRepository introduceUserSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIntroduceUserMockMvc;

    private IntroduceUser introduceUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IntroduceUserResource introduceUserResource = new IntroduceUserResource(introduceUserService);
        this.restIntroduceUserMockMvc = MockMvcBuilders.standaloneSetup(introduceUserResource)
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
    public static IntroduceUser createEntity(EntityManager em) {
        IntroduceUser introduceUser = new IntroduceUser()
            .time(DEFAULT_TIME)
            .reason(DEFAULT_REASON);
        // Add required entity
        User introduceBy = UserResourceIntTest.createEntity(em);
        em.persist(introduceBy);
        em.flush();
        introduceUser.setIntroduceBy(introduceBy);
        // Add required entity
        User introduceTo = UserResourceIntTest.createEntity(em);
        em.persist(introduceTo);
        em.flush();
        introduceUser.setIntroduceTo(introduceTo);
        // Add required entity
        User introduceUserID = UserResourceIntTest.createEntity(em);
        em.persist(introduceUserID);
        em.flush();
        introduceUser.setIntroduceUserID(introduceUserID);
        return introduceUser;
    }

    @Before
    public void initTest() {
        introduceUserSearchRepository.deleteAll();
        introduceUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createIntroduceUser() throws Exception {
        int databaseSizeBeforeCreate = introduceUserRepository.findAll().size();

        // Create the IntroduceUser
        IntroduceUserDTO introduceUserDTO = introduceUserMapper.toDto(introduceUser);
        restIntroduceUserMockMvc.perform(post("/api/introduce-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(introduceUserDTO)))
            .andExpect(status().isCreated());

        // Validate the IntroduceUser in the database
        List<IntroduceUser> introduceUserList = introduceUserRepository.findAll();
        assertThat(introduceUserList).hasSize(databaseSizeBeforeCreate + 1);
        IntroduceUser testIntroduceUser = introduceUserList.get(introduceUserList.size() - 1);
        assertThat(testIntroduceUser.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testIntroduceUser.getReason()).isEqualTo(DEFAULT_REASON);

        // Validate the IntroduceUser in Elasticsearch
        IntroduceUser introduceUserEs = introduceUserSearchRepository.findOne(testIntroduceUser.getId());
        assertThat(introduceUserEs).isEqualToIgnoringGivenFields(testIntroduceUser);
    }

    @Test
    @Transactional
    public void createIntroduceUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = introduceUserRepository.findAll().size();

        // Create the IntroduceUser with an existing ID
        introduceUser.setId(1L);
        IntroduceUserDTO introduceUserDTO = introduceUserMapper.toDto(introduceUser);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIntroduceUserMockMvc.perform(post("/api/introduce-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(introduceUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the IntroduceUser in the database
        List<IntroduceUser> introduceUserList = introduceUserRepository.findAll();
        assertThat(introduceUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = introduceUserRepository.findAll().size();
        // set the field null
        introduceUser.setTime(null);

        // Create the IntroduceUser, which fails.
        IntroduceUserDTO introduceUserDTO = introduceUserMapper.toDto(introduceUser);

        restIntroduceUserMockMvc.perform(post("/api/introduce-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(introduceUserDTO)))
            .andExpect(status().isBadRequest());

        List<IntroduceUser> introduceUserList = introduceUserRepository.findAll();
        assertThat(introduceUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReasonIsRequired() throws Exception {
        int databaseSizeBeforeTest = introduceUserRepository.findAll().size();
        // set the field null
        introduceUser.setReason(null);

        // Create the IntroduceUser, which fails.
        IntroduceUserDTO introduceUserDTO = introduceUserMapper.toDto(introduceUser);

        restIntroduceUserMockMvc.perform(post("/api/introduce-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(introduceUserDTO)))
            .andExpect(status().isBadRequest());

        List<IntroduceUser> introduceUserList = introduceUserRepository.findAll();
        assertThat(introduceUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIntroduceUsers() throws Exception {
        // Initialize the database
        introduceUserRepository.saveAndFlush(introduceUser);

        // Get all the introduceUserList
        restIntroduceUserMockMvc.perform(get("/api/introduce-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(introduceUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON.toString())));
    }

    @Test
    @Transactional
    public void getIntroduceUser() throws Exception {
        // Initialize the database
        introduceUserRepository.saveAndFlush(introduceUser);

        // Get the introduceUser
        restIntroduceUserMockMvc.perform(get("/api/introduce-users/{id}", introduceUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(introduceUser.getId().intValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIntroduceUser() throws Exception {
        // Get the introduceUser
        restIntroduceUserMockMvc.perform(get("/api/introduce-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIntroduceUser() throws Exception {
        // Initialize the database
        introduceUserRepository.saveAndFlush(introduceUser);
        introduceUserSearchRepository.save(introduceUser);
        int databaseSizeBeforeUpdate = introduceUserRepository.findAll().size();

        // Update the introduceUser
        IntroduceUser updatedIntroduceUser = introduceUserRepository.findOne(introduceUser.getId());
        // Disconnect from session so that the updates on updatedIntroduceUser are not directly saved in db
        em.detach(updatedIntroduceUser);
        updatedIntroduceUser
            .time(UPDATED_TIME)
            .reason(UPDATED_REASON);
        IntroduceUserDTO introduceUserDTO = introduceUserMapper.toDto(updatedIntroduceUser);

        restIntroduceUserMockMvc.perform(put("/api/introduce-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(introduceUserDTO)))
            .andExpect(status().isOk());

        // Validate the IntroduceUser in the database
        List<IntroduceUser> introduceUserList = introduceUserRepository.findAll();
        assertThat(introduceUserList).hasSize(databaseSizeBeforeUpdate);
        IntroduceUser testIntroduceUser = introduceUserList.get(introduceUserList.size() - 1);
        assertThat(testIntroduceUser.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testIntroduceUser.getReason()).isEqualTo(UPDATED_REASON);

        // Validate the IntroduceUser in Elasticsearch
        IntroduceUser introduceUserEs = introduceUserSearchRepository.findOne(testIntroduceUser.getId());
        assertThat(introduceUserEs).isEqualToIgnoringGivenFields(testIntroduceUser);
    }

    @Test
    @Transactional
    public void updateNonExistingIntroduceUser() throws Exception {
        int databaseSizeBeforeUpdate = introduceUserRepository.findAll().size();

        // Create the IntroduceUser
        IntroduceUserDTO introduceUserDTO = introduceUserMapper.toDto(introduceUser);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIntroduceUserMockMvc.perform(put("/api/introduce-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(introduceUserDTO)))
            .andExpect(status().isCreated());

        // Validate the IntroduceUser in the database
        List<IntroduceUser> introduceUserList = introduceUserRepository.findAll();
        assertThat(introduceUserList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIntroduceUser() throws Exception {
        // Initialize the database
        introduceUserRepository.saveAndFlush(introduceUser);
        introduceUserSearchRepository.save(introduceUser);
        int databaseSizeBeforeDelete = introduceUserRepository.findAll().size();

        // Get the introduceUser
        restIntroduceUserMockMvc.perform(delete("/api/introduce-users/{id}", introduceUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean introduceUserExistsInEs = introduceUserSearchRepository.exists(introduceUser.getId());
        assertThat(introduceUserExistsInEs).isFalse();

        // Validate the database is empty
        List<IntroduceUser> introduceUserList = introduceUserRepository.findAll();
        assertThat(introduceUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchIntroduceUser() throws Exception {
        // Initialize the database
        introduceUserRepository.saveAndFlush(introduceUser);
        introduceUserSearchRepository.save(introduceUser);

        // Search the introduceUser
        restIntroduceUserMockMvc.perform(get("/api/_search/introduce-users?query=id:" + introduceUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(introduceUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IntroduceUser.class);
        IntroduceUser introduceUser1 = new IntroduceUser();
        introduceUser1.setId(1L);
        IntroduceUser introduceUser2 = new IntroduceUser();
        introduceUser2.setId(introduceUser1.getId());
        assertThat(introduceUser1).isEqualTo(introduceUser2);
        introduceUser2.setId(2L);
        assertThat(introduceUser1).isNotEqualTo(introduceUser2);
        introduceUser1.setId(null);
        assertThat(introduceUser1).isNotEqualTo(introduceUser2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(IntroduceUserDTO.class);
        IntroduceUserDTO introduceUserDTO1 = new IntroduceUserDTO();
        introduceUserDTO1.setId(1L);
        IntroduceUserDTO introduceUserDTO2 = new IntroduceUserDTO();
        assertThat(introduceUserDTO1).isNotEqualTo(introduceUserDTO2);
        introduceUserDTO2.setId(introduceUserDTO1.getId());
        assertThat(introduceUserDTO1).isEqualTo(introduceUserDTO2);
        introduceUserDTO2.setId(2L);
        assertThat(introduceUserDTO1).isNotEqualTo(introduceUserDTO2);
        introduceUserDTO1.setId(null);
        assertThat(introduceUserDTO1).isNotEqualTo(introduceUserDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(introduceUserMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(introduceUserMapper.fromId(null)).isNull();
    }
}
