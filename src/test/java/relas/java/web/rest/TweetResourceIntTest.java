package relas.java.web.rest;

import relas.java.RelasApp;

import relas.java.domain.Tweet;
import relas.java.domain.User;
import relas.java.repository.TweetRepository;
import relas.java.service.TweetService;
import relas.java.repository.search.TweetSearchRepository;
import relas.java.service.dto.TweetDTO;
import relas.java.service.mapper.TweetMapper;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static relas.java.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TweetResource REST controller.
 *
 * @see TweetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RelasApp.class)
public class TweetResourceIntTest {

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_ACCESSORY = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ACCESSORY = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_ACCESSORY_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ACCESSORY_CONTENT_TYPE = "image/png";

    @Autowired
    private TweetRepository tweetRepository;

    @Autowired
    private TweetMapper tweetMapper;

    @Autowired
    private TweetService tweetService;

    @Autowired
    private TweetSearchRepository tweetSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTweetMockMvc;

    private Tweet tweet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TweetResource tweetResource = new TweetResource(tweetService);
        this.restTweetMockMvc = MockMvcBuilders.standaloneSetup(tweetResource)
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
    public static Tweet createEntity(EntityManager em) {
        Tweet tweet = new Tweet()
            .time(DEFAULT_TIME)
            .message(DEFAULT_MESSAGE)
            .accessory(DEFAULT_ACCESSORY)
            .accessoryContentType(DEFAULT_ACCESSORY_CONTENT_TYPE);
        // Add required entity
        User userID = UserResourceIntTest.createEntity(em);
        em.persist(userID);
        em.flush();
        tweet.setUserID(userID);
        return tweet;
    }

    @Before
    public void initTest() {
        tweetSearchRepository.deleteAll();
        tweet = createEntity(em);
    }

    @Test
    @Transactional
    public void createTweet() throws Exception {
        int databaseSizeBeforeCreate = tweetRepository.findAll().size();

        // Create the Tweet
        TweetDTO tweetDTO = tweetMapper.toDto(tweet);
        restTweetMockMvc.perform(post("/api/tweets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tweetDTO)))
            .andExpect(status().isCreated());

        // Validate the Tweet in the database
        List<Tweet> tweetList = tweetRepository.findAll();
        assertThat(tweetList).hasSize(databaseSizeBeforeCreate + 1);
        Tweet testTweet = tweetList.get(tweetList.size() - 1);
        assertThat(testTweet.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testTweet.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testTweet.getAccessory()).isEqualTo(DEFAULT_ACCESSORY);
        assertThat(testTweet.getAccessoryContentType()).isEqualTo(DEFAULT_ACCESSORY_CONTENT_TYPE);

        // Validate the Tweet in Elasticsearch
        Tweet tweetEs = tweetSearchRepository.findOne(testTweet.getId());
        assertThat(tweetEs).isEqualToIgnoringGivenFields(testTweet);
    }

    @Test
    @Transactional
    public void createTweetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tweetRepository.findAll().size();

        // Create the Tweet with an existing ID
        tweet.setId(1L);
        TweetDTO tweetDTO = tweetMapper.toDto(tweet);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTweetMockMvc.perform(post("/api/tweets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tweetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Tweet in the database
        List<Tweet> tweetList = tweetRepository.findAll();
        assertThat(tweetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tweetRepository.findAll().size();
        // set the field null
        tweet.setTime(null);

        // Create the Tweet, which fails.
        TweetDTO tweetDTO = tweetMapper.toDto(tweet);

        restTweetMockMvc.perform(post("/api/tweets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tweetDTO)))
            .andExpect(status().isBadRequest());

        List<Tweet> tweetList = tweetRepository.findAll();
        assertThat(tweetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMessageIsRequired() throws Exception {
        int databaseSizeBeforeTest = tweetRepository.findAll().size();
        // set the field null
        tweet.setMessage(null);

        // Create the Tweet, which fails.
        TweetDTO tweetDTO = tweetMapper.toDto(tweet);

        restTweetMockMvc.perform(post("/api/tweets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tweetDTO)))
            .andExpect(status().isBadRequest());

        List<Tweet> tweetList = tweetRepository.findAll();
        assertThat(tweetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTweets() throws Exception {
        // Initialize the database
        tweetRepository.saveAndFlush(tweet);

        // Get all the tweetList
        restTweetMockMvc.perform(get("/api/tweets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tweet.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].accessoryContentType").value(hasItem(DEFAULT_ACCESSORY_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].accessory").value(hasItem(Base64Utils.encodeToString(DEFAULT_ACCESSORY))));
    }

    @Test
    @Transactional
    public void getTweet() throws Exception {
        // Initialize the database
        tweetRepository.saveAndFlush(tweet);

        // Get the tweet
        restTweetMockMvc.perform(get("/api/tweets/{id}", tweet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tweet.getId().intValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()))
            .andExpect(jsonPath("$.accessoryContentType").value(DEFAULT_ACCESSORY_CONTENT_TYPE))
            .andExpect(jsonPath("$.accessory").value(Base64Utils.encodeToString(DEFAULT_ACCESSORY)));
    }

    @Test
    @Transactional
    public void getNonExistingTweet() throws Exception {
        // Get the tweet
        restTweetMockMvc.perform(get("/api/tweets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTweet() throws Exception {
        // Initialize the database
        tweetRepository.saveAndFlush(tweet);
        tweetSearchRepository.save(tweet);
        int databaseSizeBeforeUpdate = tweetRepository.findAll().size();

        // Update the tweet
        Tweet updatedTweet = tweetRepository.findOne(tweet.getId());
        // Disconnect from session so that the updates on updatedTweet are not directly saved in db
        em.detach(updatedTweet);
        updatedTweet
            .time(UPDATED_TIME)
            .message(UPDATED_MESSAGE)
            .accessory(UPDATED_ACCESSORY)
            .accessoryContentType(UPDATED_ACCESSORY_CONTENT_TYPE);
        TweetDTO tweetDTO = tweetMapper.toDto(updatedTweet);

        restTweetMockMvc.perform(put("/api/tweets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tweetDTO)))
            .andExpect(status().isOk());

        // Validate the Tweet in the database
        List<Tweet> tweetList = tweetRepository.findAll();
        assertThat(tweetList).hasSize(databaseSizeBeforeUpdate);
        Tweet testTweet = tweetList.get(tweetList.size() - 1);
        assertThat(testTweet.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testTweet.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testTweet.getAccessory()).isEqualTo(UPDATED_ACCESSORY);
        assertThat(testTweet.getAccessoryContentType()).isEqualTo(UPDATED_ACCESSORY_CONTENT_TYPE);

        // Validate the Tweet in Elasticsearch
        Tweet tweetEs = tweetSearchRepository.findOne(testTweet.getId());
        assertThat(tweetEs).isEqualToIgnoringGivenFields(testTweet);
    }

    @Test
    @Transactional
    public void updateNonExistingTweet() throws Exception {
        int databaseSizeBeforeUpdate = tweetRepository.findAll().size();

        // Create the Tweet
        TweetDTO tweetDTO = tweetMapper.toDto(tweet);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTweetMockMvc.perform(put("/api/tweets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tweetDTO)))
            .andExpect(status().isCreated());

        // Validate the Tweet in the database
        List<Tweet> tweetList = tweetRepository.findAll();
        assertThat(tweetList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTweet() throws Exception {
        // Initialize the database
        tweetRepository.saveAndFlush(tweet);
        tweetSearchRepository.save(tweet);
        int databaseSizeBeforeDelete = tweetRepository.findAll().size();

        // Get the tweet
        restTweetMockMvc.perform(delete("/api/tweets/{id}", tweet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tweetExistsInEs = tweetSearchRepository.exists(tweet.getId());
        assertThat(tweetExistsInEs).isFalse();

        // Validate the database is empty
        List<Tweet> tweetList = tweetRepository.findAll();
        assertThat(tweetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTweet() throws Exception {
        // Initialize the database
        tweetRepository.saveAndFlush(tweet);
        tweetSearchRepository.save(tweet);

        // Search the tweet
        restTweetMockMvc.perform(get("/api/_search/tweets?query=id:" + tweet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tweet.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].accessoryContentType").value(hasItem(DEFAULT_ACCESSORY_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].accessory").value(hasItem(Base64Utils.encodeToString(DEFAULT_ACCESSORY))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tweet.class);
        Tweet tweet1 = new Tweet();
        tweet1.setId(1L);
        Tweet tweet2 = new Tweet();
        tweet2.setId(tweet1.getId());
        assertThat(tweet1).isEqualTo(tweet2);
        tweet2.setId(2L);
        assertThat(tweet1).isNotEqualTo(tweet2);
        tweet1.setId(null);
        assertThat(tweet1).isNotEqualTo(tweet2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TweetDTO.class);
        TweetDTO tweetDTO1 = new TweetDTO();
        tweetDTO1.setId(1L);
        TweetDTO tweetDTO2 = new TweetDTO();
        assertThat(tweetDTO1).isNotEqualTo(tweetDTO2);
        tweetDTO2.setId(tweetDTO1.getId());
        assertThat(tweetDTO1).isEqualTo(tweetDTO2);
        tweetDTO2.setId(2L);
        assertThat(tweetDTO1).isNotEqualTo(tweetDTO2);
        tweetDTO1.setId(null);
        assertThat(tweetDTO1).isNotEqualTo(tweetDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tweetMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tweetMapper.fromId(null)).isNull();
    }
}
