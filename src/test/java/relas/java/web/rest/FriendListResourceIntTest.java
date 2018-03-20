package relas.java.web.rest;

import relas.java.RelasApp;

import relas.java.domain.FriendList;
import relas.java.domain.User;
import relas.java.domain.User;
import relas.java.repository.FriendListRepository;
import relas.java.service.FriendListService;
import relas.java.repository.search.FriendListSearchRepository;
import relas.java.service.dto.FriendListDTO;
import relas.java.service.mapper.FriendListMapper;
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

/**
 * Test class for the FriendListResource REST controller.
 *
 * @see FriendListResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RelasApp.class)
public class FriendListResourceIntTest {

    private static final String DEFAULT_USER_RELATIONSHIP = "AAAAAAAAAA";
    private static final String UPDATED_USER_RELATIONSHIP = "BBBBBBBBBB";

    private static final String DEFAULT_REMARK = "AAAAAAAAAA";
    private static final String UPDATED_REMARK = "BBBBBBBBBB";

    @Autowired
    private FriendListRepository friendListRepository;

    @Autowired
    private FriendListMapper friendListMapper;

    @Autowired
    private FriendListService friendListService;

    @Autowired
    private FriendListSearchRepository friendListSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFriendListMockMvc;

    private FriendList friendList;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FriendListResource friendListResource = new FriendListResource(friendListService);
        this.restFriendListMockMvc = MockMvcBuilders.standaloneSetup(friendListResource)
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
    public static FriendList createEntity(EntityManager em) {
        FriendList friendList = new FriendList()
            .userRelationship(DEFAULT_USER_RELATIONSHIP)
            .remark(DEFAULT_REMARK);
        // Add required entity
        User userID = UserResourceIntTest.createEntity(em);
        em.persist(userID);
        em.flush();
        friendList.setUserID(userID);
        // Add required entity
        User friendID = UserResourceIntTest.createEntity(em);
        em.persist(friendID);
        em.flush();
        friendList.setFriendID(friendID);
        return friendList;
    }

    @Before
    public void initTest() {
        friendListSearchRepository.deleteAll();
        friendList = createEntity(em);
    }

    @Test
    @Transactional
    public void createFriendList() throws Exception {
        int databaseSizeBeforeCreate = friendListRepository.findAll().size();

        // Create the FriendList
        FriendListDTO friendListDTO = friendListMapper.toDto(friendList);
        restFriendListMockMvc.perform(post("/api/friend-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(friendListDTO)))
            .andExpect(status().isCreated());

        // Validate the FriendList in the database
        List<FriendList> friendListList = friendListRepository.findAll();
        assertThat(friendListList).hasSize(databaseSizeBeforeCreate + 1);
        FriendList testFriendList = friendListList.get(friendListList.size() - 1);
        assertThat(testFriendList.getUserRelationship()).isEqualTo(DEFAULT_USER_RELATIONSHIP);
        assertThat(testFriendList.getRemark()).isEqualTo(DEFAULT_REMARK);

        // Validate the FriendList in Elasticsearch
        FriendList friendListEs = friendListSearchRepository.findOne(testFriendList.getId());
        assertThat(friendListEs).isEqualToIgnoringGivenFields(testFriendList);
    }

    @Test
    @Transactional
    public void createFriendListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = friendListRepository.findAll().size();

        // Create the FriendList with an existing ID
        friendList.setId(1L);
        FriendListDTO friendListDTO = friendListMapper.toDto(friendList);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFriendListMockMvc.perform(post("/api/friend-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(friendListDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FriendList in the database
        List<FriendList> friendListList = friendListRepository.findAll();
        assertThat(friendListList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFriendLists() throws Exception {
        // Initialize the database
        friendListRepository.saveAndFlush(friendList);

        // Get all the friendListList
        restFriendListMockMvc.perform(get("/api/friend-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(friendList.getId().intValue())))
            .andExpect(jsonPath("$.[*].userRelationship").value(hasItem(DEFAULT_USER_RELATIONSHIP.toString())))
            .andExpect(jsonPath("$.[*].remark").value(hasItem(DEFAULT_REMARK.toString())));
    }

    @Test
    @Transactional
    public void getFriendList() throws Exception {
        // Initialize the database
        friendListRepository.saveAndFlush(friendList);

        // Get the friendList
        restFriendListMockMvc.perform(get("/api/friend-lists/{id}", friendList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(friendList.getId().intValue()))
            .andExpect(jsonPath("$.userRelationship").value(DEFAULT_USER_RELATIONSHIP.toString()))
            .andExpect(jsonPath("$.remark").value(DEFAULT_REMARK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFriendList() throws Exception {
        // Get the friendList
        restFriendListMockMvc.perform(get("/api/friend-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFriendList() throws Exception {
        // Initialize the database
        friendListRepository.saveAndFlush(friendList);
        friendListSearchRepository.save(friendList);
        int databaseSizeBeforeUpdate = friendListRepository.findAll().size();

        // Update the friendList
        FriendList updatedFriendList = friendListRepository.findOne(friendList.getId());
        // Disconnect from session so that the updates on updatedFriendList are not directly saved in db
        em.detach(updatedFriendList);
        updatedFriendList
            .userRelationship(UPDATED_USER_RELATIONSHIP)
            .remark(UPDATED_REMARK);
        FriendListDTO friendListDTO = friendListMapper.toDto(updatedFriendList);

        restFriendListMockMvc.perform(put("/api/friend-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(friendListDTO)))
            .andExpect(status().isOk());

        // Validate the FriendList in the database
        List<FriendList> friendListList = friendListRepository.findAll();
        assertThat(friendListList).hasSize(databaseSizeBeforeUpdate);
        FriendList testFriendList = friendListList.get(friendListList.size() - 1);
        assertThat(testFriendList.getUserRelationship()).isEqualTo(UPDATED_USER_RELATIONSHIP);
        assertThat(testFriendList.getRemark()).isEqualTo(UPDATED_REMARK);

        // Validate the FriendList in Elasticsearch
        FriendList friendListEs = friendListSearchRepository.findOne(testFriendList.getId());
        assertThat(friendListEs).isEqualToIgnoringGivenFields(testFriendList);
    }

    @Test
    @Transactional
    public void updateNonExistingFriendList() throws Exception {
        int databaseSizeBeforeUpdate = friendListRepository.findAll().size();

        // Create the FriendList
        FriendListDTO friendListDTO = friendListMapper.toDto(friendList);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFriendListMockMvc.perform(put("/api/friend-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(friendListDTO)))
            .andExpect(status().isCreated());

        // Validate the FriendList in the database
        List<FriendList> friendListList = friendListRepository.findAll();
        assertThat(friendListList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFriendList() throws Exception {
        // Initialize the database
        friendListRepository.saveAndFlush(friendList);
        friendListSearchRepository.save(friendList);
        int databaseSizeBeforeDelete = friendListRepository.findAll().size();

        // Get the friendList
        restFriendListMockMvc.perform(delete("/api/friend-lists/{id}", friendList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean friendListExistsInEs = friendListSearchRepository.exists(friendList.getId());
        assertThat(friendListExistsInEs).isFalse();

        // Validate the database is empty
        List<FriendList> friendListList = friendListRepository.findAll();
        assertThat(friendListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFriendList() throws Exception {
        // Initialize the database
        friendListRepository.saveAndFlush(friendList);
        friendListSearchRepository.save(friendList);

        // Search the friendList
        restFriendListMockMvc.perform(get("/api/_search/friend-lists?query=id:" + friendList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(friendList.getId().intValue())))
            .andExpect(jsonPath("$.[*].userRelationship").value(hasItem(DEFAULT_USER_RELATIONSHIP.toString())))
            .andExpect(jsonPath("$.[*].remark").value(hasItem(DEFAULT_REMARK.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FriendList.class);
        FriendList friendList1 = new FriendList();
        friendList1.setId(1L);
        FriendList friendList2 = new FriendList();
        friendList2.setId(friendList1.getId());
        assertThat(friendList1).isEqualTo(friendList2);
        friendList2.setId(2L);
        assertThat(friendList1).isNotEqualTo(friendList2);
        friendList1.setId(null);
        assertThat(friendList1).isNotEqualTo(friendList2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FriendListDTO.class);
        FriendListDTO friendListDTO1 = new FriendListDTO();
        friendListDTO1.setId(1L);
        FriendListDTO friendListDTO2 = new FriendListDTO();
        assertThat(friendListDTO1).isNotEqualTo(friendListDTO2);
        friendListDTO2.setId(friendListDTO1.getId());
        assertThat(friendListDTO1).isEqualTo(friendListDTO2);
        friendListDTO2.setId(2L);
        assertThat(friendListDTO1).isNotEqualTo(friendListDTO2);
        friendListDTO1.setId(null);
        assertThat(friendListDTO1).isNotEqualTo(friendListDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(friendListMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(friendListMapper.fromId(null)).isNull();
    }
}
