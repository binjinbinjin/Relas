package relas.java.web.rest;

import relas.java.RelasApp;

import relas.java.domain.UnreadChatMessage;
import relas.java.domain.ChatMessage;
import relas.java.domain.User;
import relas.java.repository.UnreadChatMessageRepository;
import relas.java.service.ChatMessageService;
import relas.java.service.UnreadChatMessageService;
import relas.java.repository.search.UnreadChatMessageSearchRepository;
import relas.java.service.dto.UnreadChatMessageDTO;
import relas.java.service.mapper.UnreadChatMessageMapper;
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
 * Test class for the UnreadChatMessageResource REST controller.
 *
 * @see UnreadChatMessageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RelasApp.class)
public class UnreadChatMessageResourceIntTest {

    @Autowired
    private UnreadChatMessageRepository unreadChatMessageRepository;

    @Autowired
    private UnreadChatMessageMapper unreadChatMessageMapper;

    @Autowired
    private UnreadChatMessageService unreadChatMessageService;

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private UnreadChatMessageSearchRepository unreadChatMessageSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUnreadChatMessageMockMvc;

    private UnreadChatMessage unreadChatMessage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UnreadChatMessageResource unreadChatMessageResource = new UnreadChatMessageResource(unreadChatMessageService, chatMessageService);
        this.restUnreadChatMessageMockMvc = MockMvcBuilders.standaloneSetup(unreadChatMessageResource)
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
    public static UnreadChatMessage createEntity(EntityManager em) {
        UnreadChatMessage unreadChatMessage = new UnreadChatMessage();
        // Add required entity
        ChatMessage message = ChatMessageResourceIntTest.createEntity(em);
        em.persist(message);
        em.flush();
        unreadChatMessage.setMessage(message);
        // Add required entity
        User userID = UserResourceIntTest.createEntity(em);
        em.persist(userID);
        em.flush();
        unreadChatMessage.setUserID(userID);
        return unreadChatMessage;
    }

    @Before
    public void initTest() {
        unreadChatMessageSearchRepository.deleteAll();
        unreadChatMessage = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnreadChatMessage() throws Exception {
        int databaseSizeBeforeCreate = unreadChatMessageRepository.findAll().size();

        // Create the UnreadChatMessage
        UnreadChatMessageDTO unreadChatMessageDTO = unreadChatMessageMapper.toDto(unreadChatMessage);
        restUnreadChatMessageMockMvc.perform(post("/api/unread-chat-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unreadChatMessageDTO)))
            .andExpect(status().isCreated());

        // Validate the UnreadChatMessage in the database
        List<UnreadChatMessage> unreadChatMessageList = unreadChatMessageRepository.findAll();
        assertThat(unreadChatMessageList).hasSize(databaseSizeBeforeCreate + 1);
        UnreadChatMessage testUnreadChatMessage = unreadChatMessageList.get(unreadChatMessageList.size() - 1);

        // Validate the UnreadChatMessage in Elasticsearch
        UnreadChatMessage unreadChatMessageEs = unreadChatMessageSearchRepository.findOne(testUnreadChatMessage.getId());
        assertThat(unreadChatMessageEs).isEqualToIgnoringGivenFields(testUnreadChatMessage);
    }

    @Test
    @Transactional
    public void createUnreadChatMessageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unreadChatMessageRepository.findAll().size();

        // Create the UnreadChatMessage with an existing ID
        unreadChatMessage.setId(1L);
        UnreadChatMessageDTO unreadChatMessageDTO = unreadChatMessageMapper.toDto(unreadChatMessage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnreadChatMessageMockMvc.perform(post("/api/unread-chat-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unreadChatMessageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UnreadChatMessage in the database
        List<UnreadChatMessage> unreadChatMessageList = unreadChatMessageRepository.findAll();
        assertThat(unreadChatMessageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUnreadChatMessages() throws Exception {
        // Initialize the database
        unreadChatMessageRepository.saveAndFlush(unreadChatMessage);

        // Get all the unreadChatMessageList
        restUnreadChatMessageMockMvc.perform(get("/api/unread-chat-messages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unreadChatMessage.getId().intValue())));
    }

    @Test
    @Transactional
    public void getUnreadChatMessage() throws Exception {
        // Initialize the database
        unreadChatMessageRepository.saveAndFlush(unreadChatMessage);

        // Get the unreadChatMessage
        restUnreadChatMessageMockMvc.perform(get("/api/unread-chat-messages/{id}", unreadChatMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(unreadChatMessage.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUnreadChatMessage() throws Exception {
        // Get the unreadChatMessage
        restUnreadChatMessageMockMvc.perform(get("/api/unread-chat-messages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnreadChatMessage() throws Exception {
        // Initialize the database
        unreadChatMessageRepository.saveAndFlush(unreadChatMessage);
        unreadChatMessageSearchRepository.save(unreadChatMessage);
        int databaseSizeBeforeUpdate = unreadChatMessageRepository.findAll().size();

        // Update the unreadChatMessage
        UnreadChatMessage updatedUnreadChatMessage = unreadChatMessageRepository.findOne(unreadChatMessage.getId());
        // Disconnect from session so that the updates on updatedUnreadChatMessage are not directly saved in db
        em.detach(updatedUnreadChatMessage);
        UnreadChatMessageDTO unreadChatMessageDTO = unreadChatMessageMapper.toDto(updatedUnreadChatMessage);

        restUnreadChatMessageMockMvc.perform(put("/api/unread-chat-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unreadChatMessageDTO)))
            .andExpect(status().isOk());

        // Validate the UnreadChatMessage in the database
        List<UnreadChatMessage> unreadChatMessageList = unreadChatMessageRepository.findAll();
        assertThat(unreadChatMessageList).hasSize(databaseSizeBeforeUpdate);
        UnreadChatMessage testUnreadChatMessage = unreadChatMessageList.get(unreadChatMessageList.size() - 1);

        // Validate the UnreadChatMessage in Elasticsearch
        UnreadChatMessage unreadChatMessageEs = unreadChatMessageSearchRepository.findOne(testUnreadChatMessage.getId());
        assertThat(unreadChatMessageEs).isEqualToIgnoringGivenFields(testUnreadChatMessage);
    }

    @Test
    @Transactional
    public void updateNonExistingUnreadChatMessage() throws Exception {
        int databaseSizeBeforeUpdate = unreadChatMessageRepository.findAll().size();

        // Create the UnreadChatMessage
        UnreadChatMessageDTO unreadChatMessageDTO = unreadChatMessageMapper.toDto(unreadChatMessage);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUnreadChatMessageMockMvc.perform(put("/api/unread-chat-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unreadChatMessageDTO)))
            .andExpect(status().isCreated());

        // Validate the UnreadChatMessage in the database
        List<UnreadChatMessage> unreadChatMessageList = unreadChatMessageRepository.findAll();
        assertThat(unreadChatMessageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUnreadChatMessage() throws Exception {
        // Initialize the database
        unreadChatMessageRepository.saveAndFlush(unreadChatMessage);
        unreadChatMessageSearchRepository.save(unreadChatMessage);
        int databaseSizeBeforeDelete = unreadChatMessageRepository.findAll().size();

        // Get the unreadChatMessage
        restUnreadChatMessageMockMvc.perform(delete("/api/unread-chat-messages/{id}", unreadChatMessage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean unreadChatMessageExistsInEs = unreadChatMessageSearchRepository.exists(unreadChatMessage.getId());
        assertThat(unreadChatMessageExistsInEs).isFalse();

        // Validate the database is empty
        List<UnreadChatMessage> unreadChatMessageList = unreadChatMessageRepository.findAll();
        assertThat(unreadChatMessageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchUnreadChatMessage() throws Exception {
        // Initialize the database
        unreadChatMessageRepository.saveAndFlush(unreadChatMessage);
        unreadChatMessageSearchRepository.save(unreadChatMessage);

        // Search the unreadChatMessage
        restUnreadChatMessageMockMvc.perform(get("/api/_search/unread-chat-messages?query=id:" + unreadChatMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unreadChatMessage.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UnreadChatMessage.class);
        UnreadChatMessage unreadChatMessage1 = new UnreadChatMessage();
        unreadChatMessage1.setId(1L);
        UnreadChatMessage unreadChatMessage2 = new UnreadChatMessage();
        unreadChatMessage2.setId(unreadChatMessage1.getId());
        assertThat(unreadChatMessage1).isEqualTo(unreadChatMessage2);
        unreadChatMessage2.setId(2L);
        assertThat(unreadChatMessage1).isNotEqualTo(unreadChatMessage2);
        unreadChatMessage1.setId(null);
        assertThat(unreadChatMessage1).isNotEqualTo(unreadChatMessage2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UnreadChatMessageDTO.class);
        UnreadChatMessageDTO unreadChatMessageDTO1 = new UnreadChatMessageDTO();
        unreadChatMessageDTO1.setId(1L);
        UnreadChatMessageDTO unreadChatMessageDTO2 = new UnreadChatMessageDTO();
        assertThat(unreadChatMessageDTO1).isNotEqualTo(unreadChatMessageDTO2);
        unreadChatMessageDTO2.setId(unreadChatMessageDTO1.getId());
        assertThat(unreadChatMessageDTO1).isEqualTo(unreadChatMessageDTO2);
        unreadChatMessageDTO2.setId(2L);
        assertThat(unreadChatMessageDTO1).isNotEqualTo(unreadChatMessageDTO2);
        unreadChatMessageDTO1.setId(null);
        assertThat(unreadChatMessageDTO1).isNotEqualTo(unreadChatMessageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(unreadChatMessageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(unreadChatMessageMapper.fromId(null)).isNull();
    }
}
