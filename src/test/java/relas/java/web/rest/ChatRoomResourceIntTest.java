package relas.java.web.rest;

import relas.java.RelasApp;

import relas.java.domain.ChatRoom;
import relas.java.repository.ChatRoomRepository;
import relas.java.service.ChatRoomService;
import relas.java.repository.search.ChatRoomSearchRepository;
import relas.java.service.dto.ChatRoomDTO;
import relas.java.service.mapper.ChatRoomMapper;
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
 * Test class for the ChatRoomResource REST controller.
 *
 * @see ChatRoomResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RelasApp.class)
public class ChatRoomResourceIntTest {

    private static final Long DEFAULT_CHAT_ID = 1L;
    private static final Long UPDATED_CHAT_ID = 2L;

    private static final Integer DEFAULT_MAX_MEMBER = 1;
    private static final Integer UPDATED_MAX_MEMBER = 2;

    private static final String DEFAULT_CHAT_ROOM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CHAT_ROOM_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private ChatRoomMapper chatRoomMapper;

    @Autowired
    private ChatRoomService chatRoomService;

    @Autowired
    private ChatRoomSearchRepository chatRoomSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChatRoomMockMvc;

    private ChatRoom chatRoom;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChatRoomResource chatRoomResource = new ChatRoomResource(chatRoomService);
        this.restChatRoomMockMvc = MockMvcBuilders.standaloneSetup(chatRoomResource)
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
    public static ChatRoom createEntity(EntityManager em) {
        ChatRoom chatRoom = new ChatRoom()
            .chatID(DEFAULT_CHAT_ID)
            .maxMember(DEFAULT_MAX_MEMBER)
            .chatRoomName(DEFAULT_CHAT_ROOM_NAME)
            .description(DEFAULT_DESCRIPTION);
        return chatRoom;
    }

    @Before
    public void initTest() {
        chatRoomSearchRepository.deleteAll();
        chatRoom = createEntity(em);
    }

    @Test
    @Transactional
    public void createChatRoom() throws Exception {
        int databaseSizeBeforeCreate = chatRoomRepository.findAll().size();

        // Create the ChatRoom
        ChatRoomDTO chatRoomDTO = chatRoomMapper.toDto(chatRoom);
        restChatRoomMockMvc.perform(post("/api/chat-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatRoomDTO)))
            .andExpect(status().isCreated());

        // Validate the ChatRoom in the database
        List<ChatRoom> chatRoomList = chatRoomRepository.findAll();
        assertThat(chatRoomList).hasSize(databaseSizeBeforeCreate + 1);
        ChatRoom testChatRoom = chatRoomList.get(chatRoomList.size() - 1);
        assertThat(testChatRoom.getChatID()).isEqualTo(testChatRoom.getId());
        assertThat(testChatRoom.getMaxMember()).isEqualTo(DEFAULT_MAX_MEMBER);
        assertThat(testChatRoom.getChatRoomName()).isEqualTo(DEFAULT_CHAT_ROOM_NAME);
        assertThat(testChatRoom.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the ChatRoom in Elasticsearch
        ChatRoom chatRoomEs = chatRoomSearchRepository.findOne(testChatRoom.getId());
        assertThat(chatRoomEs).isEqualToIgnoringGivenFields(testChatRoom);
    }

    @Test
    @Transactional
    public void createChatRoomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chatRoomRepository.findAll().size();

        // Create the ChatRoom with an existing ID
        chatRoom.setId(1L);
        ChatRoomDTO chatRoomDTO = chatRoomMapper.toDto(chatRoom);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChatRoomMockMvc.perform(post("/api/chat-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatRoomDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ChatRoom in the database
        List<ChatRoom> chatRoomList = chatRoomRepository.findAll();
        assertThat(chatRoomList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkChatIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = chatRoomRepository.findAll().size();
        // set the field null
        chatRoom.setChatID(null);

        // Create the ChatRoom, which fails.
        ChatRoomDTO chatRoomDTO = chatRoomMapper.toDto(chatRoom);

        restChatRoomMockMvc.perform(post("/api/chat-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatRoomDTO)))
            .andExpect(status().isBadRequest());

        List<ChatRoom> chatRoomList = chatRoomRepository.findAll();
        assertThat(chatRoomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMaxMemberIsRequired() throws Exception {
        int databaseSizeBeforeTest = chatRoomRepository.findAll().size();
        // set the field null
        chatRoom.setMaxMember(null);

        // Create the ChatRoom, which fails.
        ChatRoomDTO chatRoomDTO = chatRoomMapper.toDto(chatRoom);

        restChatRoomMockMvc.perform(post("/api/chat-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatRoomDTO)))
            .andExpect(status().isBadRequest());

        List<ChatRoom> chatRoomList = chatRoomRepository.findAll();
        assertThat(chatRoomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllChatRooms() throws Exception {
        // Initialize the database
        chatRoomRepository.saveAndFlush(chatRoom);

        // Get all the chatRoomList
        restChatRoomMockMvc.perform(get("/api/chat-rooms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chatRoom.getId().intValue())))
            .andExpect(jsonPath("$.[*].chatID").value(hasItem(DEFAULT_CHAT_ID.intValue())))
            .andExpect(jsonPath("$.[*].maxMember").value(hasItem(DEFAULT_MAX_MEMBER)))
            .andExpect(jsonPath("$.[*].chatRoomName").value(hasItem(DEFAULT_CHAT_ROOM_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getChatRoom() throws Exception {
        // Initialize the database
        chatRoomRepository.saveAndFlush(chatRoom);

        // Get the chatRoom
        restChatRoomMockMvc.perform(get("/api/chat-rooms/{id}", chatRoom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chatRoom.getId().intValue()))
            .andExpect(jsonPath("$.chatID").value(DEFAULT_CHAT_ID.intValue()))
            .andExpect(jsonPath("$.maxMember").value(DEFAULT_MAX_MEMBER))
            .andExpect(jsonPath("$.chatRoomName").value(DEFAULT_CHAT_ROOM_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingChatRoom() throws Exception {
        // Get the chatRoom
        restChatRoomMockMvc.perform(get("/api/chat-rooms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChatRoom() throws Exception {
        // Initialize the database
        chatRoomRepository.saveAndFlush(chatRoom);
        chatRoomSearchRepository.save(chatRoom);
        int databaseSizeBeforeUpdate = chatRoomRepository.findAll().size();

        // Update the chatRoom
        ChatRoom updatedChatRoom = chatRoomRepository.findOne(chatRoom.getId());
        // Disconnect from session so that the updates on updatedChatRoom are not directly saved in db
        em.detach(updatedChatRoom);
        updatedChatRoom
            .chatID(UPDATED_CHAT_ID)
            .maxMember(UPDATED_MAX_MEMBER)
            .chatRoomName(UPDATED_CHAT_ROOM_NAME)
            .description(UPDATED_DESCRIPTION);
        ChatRoomDTO chatRoomDTO = chatRoomMapper.toDto(updatedChatRoom);

        restChatRoomMockMvc.perform(put("/api/chat-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatRoomDTO)))
            .andExpect(status().isOk());

        // Validate the ChatRoom in the database
        List<ChatRoom> chatRoomList = chatRoomRepository.findAll();
        assertThat(chatRoomList).hasSize(databaseSizeBeforeUpdate);
        ChatRoom testChatRoom = chatRoomList.get(chatRoomList.size() - 1);
        assertThat(testChatRoom.getChatID()).isEqualTo(testChatRoom.getId());
        assertThat(testChatRoom.getMaxMember()).isEqualTo(UPDATED_MAX_MEMBER);
        assertThat(testChatRoom.getChatRoomName()).isEqualTo(UPDATED_CHAT_ROOM_NAME);
        assertThat(testChatRoom.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the ChatRoom in Elasticsearch
        ChatRoom chatRoomEs = chatRoomSearchRepository.findOne(testChatRoom.getId());
        assertThat(chatRoomEs).isEqualToIgnoringGivenFields(testChatRoom);
    }

    @Test
    @Transactional
    public void updateNonExistingChatRoom() throws Exception {
        int databaseSizeBeforeUpdate = chatRoomRepository.findAll().size();

        // Create the ChatRoom
        ChatRoomDTO chatRoomDTO = chatRoomMapper.toDto(chatRoom);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restChatRoomMockMvc.perform(put("/api/chat-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatRoomDTO)))
            .andExpect(status().isCreated());

        // Validate the ChatRoom in the database
        List<ChatRoom> chatRoomList = chatRoomRepository.findAll();
        assertThat(chatRoomList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteChatRoom() throws Exception {
        // Initialize the database
        chatRoomRepository.saveAndFlush(chatRoom);
        chatRoomSearchRepository.save(chatRoom);
        int databaseSizeBeforeDelete = chatRoomRepository.findAll().size();

        // Get the chatRoom
        restChatRoomMockMvc.perform(delete("/api/chat-rooms/{id}", chatRoom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean chatRoomExistsInEs = chatRoomSearchRepository.exists(chatRoom.getId());
        assertThat(chatRoomExistsInEs).isFalse();

        // Validate the database is empty
        List<ChatRoom> chatRoomList = chatRoomRepository.findAll();
        assertThat(chatRoomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchChatRoom() throws Exception {
        // Initialize the database
        chatRoomRepository.saveAndFlush(chatRoom);
        chatRoomSearchRepository.save(chatRoom);

        // Search the chatRoom
        restChatRoomMockMvc.perform(get("/api/_search/chat-rooms?query=id:" + chatRoom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chatRoom.getId().intValue())))
            .andExpect(jsonPath("$.[*].chatID").value(hasItem(DEFAULT_CHAT_ID.intValue())))
            .andExpect(jsonPath("$.[*].maxMember").value(hasItem(DEFAULT_MAX_MEMBER)))
            .andExpect(jsonPath("$.[*].chatRoomName").value(hasItem(DEFAULT_CHAT_ROOM_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChatRoom.class);
        ChatRoom chatRoom1 = new ChatRoom();
        chatRoom1.setId(1L);
        ChatRoom chatRoom2 = new ChatRoom();
        chatRoom2.setId(chatRoom1.getId());
        assertThat(chatRoom1).isEqualTo(chatRoom2);
        chatRoom2.setId(2L);
        assertThat(chatRoom1).isNotEqualTo(chatRoom2);
        chatRoom1.setId(null);
        assertThat(chatRoom1).isNotEqualTo(chatRoom2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChatRoomDTO.class);
        ChatRoomDTO chatRoomDTO1 = new ChatRoomDTO();
        chatRoomDTO1.setId(1L);
        ChatRoomDTO chatRoomDTO2 = new ChatRoomDTO();
        assertThat(chatRoomDTO1).isNotEqualTo(chatRoomDTO2);
        chatRoomDTO2.setId(chatRoomDTO1.getId());
        assertThat(chatRoomDTO1).isEqualTo(chatRoomDTO2);
        chatRoomDTO2.setId(2L);
        assertThat(chatRoomDTO1).isNotEqualTo(chatRoomDTO2);
        chatRoomDTO1.setId(null);
        assertThat(chatRoomDTO1).isNotEqualTo(chatRoomDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(chatRoomMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(chatRoomMapper.fromId(null)).isNull();
    }
}
