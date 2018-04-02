package relas.java.service.impl;

import relas.java.service.FriendListService;
import relas.java.domain.FriendList;
import relas.java.repository.FriendListRepository;
import relas.java.repository.search.FriendListSearchRepository;
import relas.java.service.dto.FriendListDTO;
import relas.java.service.mapper.FriendListMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing FriendList.
 */
@Service
@Transactional
public class FriendListServiceImpl implements FriendListService {

    private final Logger log = LoggerFactory.getLogger(FriendListServiceImpl.class);

    private final FriendListRepository friendListRepository;

    private final FriendListMapper friendListMapper;

    private final FriendListSearchRepository friendListSearchRepository;

    public FriendListServiceImpl(FriendListRepository friendListRepository, FriendListMapper friendListMapper, FriendListSearchRepository friendListSearchRepository) {
        this.friendListRepository = friendListRepository;
        this.friendListMapper = friendListMapper;
        this.friendListSearchRepository = friendListSearchRepository;
    }

    /**
     * Save a friendList.
     *
     * @param friendListDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FriendListDTO save(FriendListDTO friendListDTO) {
        log.debug("Request to save FriendList : {}", friendListDTO);
        FriendList friendList = friendListMapper.toEntity(friendListDTO);
        friendList = friendListRepository.save(friendList);
        FriendListDTO result = friendListMapper.toDto(friendList);
        friendListSearchRepository.save(friendList);
        return result;
    }

    /**
     * Get a list of user friend
     *
     * @param login user login
     * @return null if user do not have any friend,
     * otherwise a list of friend will be return
     */
    @Override
    @Transactional(readOnly = true)
    public List<FriendListDTO> getAllFriend(String login) {
        Optional<List<FriendList>> optionList = this.friendListRepository.findByUserID_Login(login);
        if (! optionList.isPresent())
            return null;
        List<FriendListDTO> friendList = this.friendListMapper.toDto(optionList.get());
        return friendList;
    }

    /**
     * Check if  user A  already in friendship with B
     * @param friendLogin user B's login
     * @param userLogin user A's login
     * @return true is A and B are friend
     * */
    @Override
    @Transactional(readOnly = true)
    public boolean friendshipCheck(String friendLogin, String userLogin){
        boolean check = this.friendListRepository.existsFriendListByFriendID_LoginAndUserID_Login(friendLogin, userLogin);
        log.debug("Check if {} is a friend of {}? Result: {}", friendLogin, userLogin, check);
        return check;
    }

    /**
     * Get all the friendLists.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FriendListDTO> findAll(Pageable pageable) {
        log.debug("Request to get all FriendLists");
        return friendListRepository.findAll(pageable)
            .map(friendListMapper::toDto);
    }


    /**
     * Get one friendList by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FriendListDTO findOne(Long id) {
        log.debug("Request to get FriendList : {}", id);
        FriendList friendList = friendListRepository.findOne(id);
        return friendListMapper.toDto(friendList);
    }

    /**
     * Delete the friendList by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FriendList : {}", id);
        friendListRepository.delete(id);
        friendListSearchRepository.delete(id);
    }

    /**
     * Search for the friendList corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FriendListDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of FriendLists for query {}", query);
        Page<FriendList> result = friendListSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(friendListMapper::toDto);
    }
}
