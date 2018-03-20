package relas.java.web.rest;

import relas.java.RelasApp;

import relas.java.domain.ChatRoomMember;
import relas.java.domain.ChatRoom;
import relas.java.domain.User;
import relas.java.repository.ChatRoomMemberRepository;
import relas.java.service.ChatRoomMemberService;
import relas.java.repository.search.ChatRoomMemberSearchRepository;
import relas.java.service.dto.ChatRoomMemberDTO;
import relas.java.service.mapper.ChatRoomMemberMapper;
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
 * Test class for the ChatRoomMemberResource REST controller.
 *
 * @see ChatRoomMemberResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RelasApp.class)
public class ChatRoomMemberResourceIntTest {

    @Autowired
    private ChatRoomMemberRepository chatRoomMemberRepository;

    @Autowired
    private ChatRoomMemberMapper chatRoomMemberMapper;

    @Autowired
    private ChatRoomMemberService chatRoomMemberService;

    @Autowired
    private ChatRoomMemberSearchRepository chatRoomMemberSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChatRoomMemberMockMvc;

    private ChatRoomMember chatRoomMember;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChatRoomMemberResource chatRoomMemberResource = new ChatRoomMemberResource(chatRoomMemberService);
        this.restChatRoomMemberMockMvc = MockMvcBuilders.standaloneSetup(chatRoomMemberResource)
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
    public static ChatRoomMember createEntity(EntityManager em) {
        ChatRoomMember chatRoomMember = new ChatRoomMember();
        // Add required entity
        ChatRoom chatID = ChatRoomResourceIntTest.createEntity(em);
        em.persist(chatID);
        em.flush();
        chatRoomMember.setChatID(chatID);
        // Add required entity
        User memberID = UserResourceIntTest.createEntity(em);
        em.persist(memberID);
        em.flush();
        chatRoomMember.setMemberID(memberID);
        return chatRoomMember;
    }

    @Before
    public void initTest() {
        chatRoomMemberSearchRepository.deleteAll();
        chatRoomMember = createEntity(em);
    }

    @Test
    @Transactional
    public void createChatRoomMember() throws Exception {
        int databaseSizeBeforeCreate = chatRoomMemberRepository.findAll().size();

        // Create the ChatRoomMember
        ChatRoomMemberDTO chatRoomMemberDTO = chatRoomMemberMapper.toDto(chatRoomMember);
        restChatRoomMemberMockMvc.perform(post("/api/chat-room-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatRoomMemberDTO)))
            .andExpect(status().isCreated());

        // Validate the ChatRoomMember in the database
        List<ChatRoomMember> chatRoomMemberList = chatRoomMemberRepository.findAll();
        assertThat(chatRoomMemberList).hasSize(databaseSizeBeforeCreate + 1);
        ChatRoomMember testChatRoomMember = chatRoomMemberList.get(chatRoomMemberList.size() - 1);

        // Validate the ChatRoomMember in Elasticsearch
        ChatRoomMember chatRoomMemberEs = chatRoomMemberSearchRepository.findOne(testChatRoomMember.getId());
        assertThat(chatRoomMemberEs).isEqualToIgnoringGivenFields(testChatRoomMember);
    }

    @Test
    @Transactional
    public void createChatRoomMemberWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chatRoomMemberRepository.findAll().size();

        // Create the ChatRoomMember with an existing ID
        chatRoomMember.setId(1L);
        ChatRoomMemberDTO chatRoomMemberDTO = chatRoomMemberMapper.toDto(chatRoomMember);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChatRoomMemberMockMvc.perform(post("/api/chat-room-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatRoomMemberDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ChatRoomMember in the database
        List<ChatRoomMember> chatRoomMemberList = chatRoomMemberRepository.findAll();
        assertThat(chatRoomMemberList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChatRoomMembers() throws Exception {
        // Initialize the database
        chatRoomMemberRepository.saveAndFlush(chatRoomMember);

        // Get all the chatRoomMemberList
        restChatRoomMemberMockMvc.perform(get("/api/chat-room-members?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chatRoomMember.getId().intValue())));
    }

    @Test
    @Transactional
    public void getChatRoomMember() throws Exception {
        // Initialize the database
        chatRoomMemberRepository.saveAndFlush(chatRoomMember);

        // Get the chatRoomMember
        restChatRoomMemberMockMvc.perform(get("/api/chat-room-members/{id}", chatRoomMember.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chatRoomMember.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingChatRoomMember() throws Exception {
        // Get the chatRoomMember
        restChatRoomMemberMockMvc.perform(get("/api/chat-room-members/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChatRoomMember() throws Exception {
        // Initialize the database
        chatRoomMemberRepository.saveAndFlush(chatRoomMember);
        chatRoomMemberSearchRepository.save(chatRoomMember);
        int databaseSizeBeforeUpdate = chatRoomMemberRepository.findAll().size();

        // Update the chatRoomMember
        ChatRoomMember updatedChatRoomMember = chatRoomMemberRepository.findOne(chatRoomMember.getId());
        // Disconnect from session so that the updates on updatedChatRoomMember are not directly saved in db
        em.detach(updatedChatRoomMember);
        ChatRoomMemberDTO chatRoomMemberDTO = chatRoomMemberMapper.toDto(updatedChatRoomMember);

        restChatRoomMemberMockMvc.perform(put("/api/chat-room-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatRoomMemberDTO)))
            .andExpect(status().isOk());

        // Validate the ChatRoomMember in the database
        List<ChatRoomMember> chatRoomMemberList = chatRoomMemberRepository.findAll();
        assertThat(chatRoomMemberList).hasSize(databaseSizeBeforeUpdate);
        ChatRoomMember testChatRoomMember = chatRoomMemberList.get(chatRoomMemberList.size() - 1);

        // Validate the ChatRoomMember in Elasticsearch
        ChatRoomMember chatRoomMemberEs = chatRoomMemberSearchRepository.findOne(testChatRoomMember.getId());
        assertThat(chatRoomMemberEs).isEqualToIgnoringGivenFields(testChatRoomMember);
    }

    @Test
    @Transactional
    public void updateNonExistingChatRoomMember() throws Exception {
        int databaseSizeBeforeUpdate = chatRoomMemberRepository.findAll().size();

        // Create the ChatRoomMember
        ChatRoomMemberDTO chatRoomMemberDTO = chatRoomMemberMapper.toDto(chatRoomMember);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restChatRoomMemberMockMvc.perform(put("/api/chat-room-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatRoomMemberDTO)))
            .andExpect(status().isCreated());

        // Validate the ChatRoomMember in the database
        List<ChatRoomMember> chatRoomMemberList = chatRoomMemberRepository.findAll();
        assertThat(chatRoomMemberList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteChatRoomMember() throws Exception {
        // Initialize the database
        chatRoomMemberRepository.saveAndFlush(chatRoomMember);
        chatRoomMemberSearchRepository.save(chatRoomMember);
        int databaseSizeBeforeDelete = chatRoomMemberRepository.findAll().size();

        // Get the chatRoomMember
        restChatRoomMemberMockMvc.perform(delete("/api/chat-room-members/{id}", chatRoomMember.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean chatRoomMemberExistsInEs = chatRoomMemberSearchRepository.exists(chatRoomMember.getId());
        assertThat(chatRoomMemberExistsInEs).isFalse();

        // Validate the database is empty
        List<ChatRoomMember> chatRoomMemberList = chatRoomMemberRepository.findAll();
        assertThat(chatRoomMemberList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchChatRoomMember() throws Exception {
        // Initialize the database
        chatRoomMemberRepository.saveAndFlush(chatRoomMember);
        chatRoomMemberSearchRepository.save(chatRoomMember);

        // Search the chatRoomMember
        restChatRoomMemberMockMvc.perform(get("/api/_search/chat-room-members?query=id:" + chatRoomMember.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chatRoomMember.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChatRoomMember.class);
        ChatRoomMember chatRoomMember1 = new ChatRoomMember();
        chatRoomMember1.setId(1L);
        ChatRoomMember chatRoomMember2 = new ChatRoomMember();
        chatRoomMember2.setId(chatRoomMember1.getId());
        assertThat(chatRoomMember1).isEqualTo(chatRoomMember2);
        chatRoomMember2.setId(2L);
        assertThat(chatRoomMember1).isNotEqualTo(chatRoomMember2);
        chatRoomMember1.setId(null);
        assertThat(chatRoomMember1).isNotEqualTo(chatRoomMember2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChatRoomMemberDTO.class);
        ChatRoomMemberDTO chatRoomMemberDTO1 = new ChatRoomMemberDTO();
        chatRoomMemberDTO1.setId(1L);
        ChatRoomMemberDTO chatRoomMemberDTO2 = new ChatRoomMemberDTO();
        assertThat(chatRoomMemberDTO1).isNotEqualTo(chatRoomMemberDTO2);
        chatRoomMemberDTO2.setId(chatRoomMemberDTO1.getId());
        assertThat(chatRoomMemberDTO1).isEqualTo(chatRoomMemberDTO2);
        chatRoomMemberDTO2.setId(2L);
        assertThat(chatRoomMemberDTO1).isNotEqualTo(chatRoomMemberDTO2);
        chatRoomMemberDTO1.setId(null);
        assertThat(chatRoomMemberDTO1).isNotEqualTo(chatRoomMemberDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(chatRoomMemberMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(chatRoomMemberMapper.fromId(null)).isNull();
    }
}
