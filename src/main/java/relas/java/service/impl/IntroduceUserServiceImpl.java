package relas.java.service.impl;

import relas.java.service.IntroduceUserService;
import relas.java.domain.IntroduceUser;
import relas.java.repository.IntroduceUserRepository;
import relas.java.repository.search.IntroduceUserSearchRepository;
import relas.java.service.dto.IntroduceUserDTO;
import relas.java.service.mapper.IntroduceUserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing IntroduceUser.
 */
@Service
@Transactional
public class IntroduceUserServiceImpl implements IntroduceUserService {

    private final Logger log = LoggerFactory.getLogger(IntroduceUserServiceImpl.class);

    private final IntroduceUserRepository introduceUserRepository;

    private final IntroduceUserMapper introduceUserMapper;

    private final IntroduceUserSearchRepository introduceUserSearchRepository;

    public IntroduceUserServiceImpl(IntroduceUserRepository introduceUserRepository, IntroduceUserMapper introduceUserMapper, IntroduceUserSearchRepository introduceUserSearchRepository) {
        this.introduceUserRepository = introduceUserRepository;
        this.introduceUserMapper = introduceUserMapper;
        this.introduceUserSearchRepository = introduceUserSearchRepository;
    }

    /**
     * Save a introduceUser.
     *
     * @param introduceUserDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public IntroduceUserDTO save(IntroduceUserDTO introduceUserDTO) {
        log.debug("Request to save IntroduceUser : {}", introduceUserDTO);
        IntroduceUser introduceUser = introduceUserMapper.toEntity(introduceUserDTO);
        introduceUser = introduceUserRepository.save(introduceUser);
        IntroduceUserDTO result = introduceUserMapper.toDto(introduceUser);
        introduceUserSearchRepository.save(introduceUser);
        return result;
    }

    /**
     * Save a introduceUser iff no same request exist
     * - the request with different reason and time, but same users will be consider as same request
     *
     * @param introduceUserDTO the entity to save
     * @return the persisted entity if no same request exist, null other
     */
    @Override
    public IntroduceUserDTO saveIfNotExist(IntroduceUserDTO introduceUserDTO) {
        if (this.introduceUserRepository.existsByIntroduceUserID_LoginAndIntroduceTo_LoginAndIntroduceBy_Login
            (introduceUserDTO.getIntroduceUserIDLogin(),
                introduceUserDTO.getIntroduceToLogin(),
                introduceUserDTO.getIntroduceByLogin())
            .get()) {
            log.debug("IntruoduceDTO exit? true");
            return null;
        }
        log.debug("IntruoduceDTO exit? false");
        IntroduceUserDTO saveDTO = this.save(introduceUserDTO);
        log.debug("IntroduceDTO do not exist, create object {}", saveDTO);
        return saveDTO;
    }

    /**
     * Save a introduceUser.
     *
     * @param login user login
     * @return a list of request
     */
    @Override
    @Transactional(readOnly = true)
    public List<IntroduceUserDTO> findByIntroduceUserID_Login(String login) {
        log.debug("Get all the user friendship request of user by Login, login: {}", login);

        Optional<List<IntroduceUser>> fetch = introduceUserRepository.findByIntroduceUserID_Login(login);
        if (!fetch.isPresent())
            return null;
        List<IntroduceUser> users = fetch.get();

        List<IntroduceUserDTO> userDTOS = introduceUserMapper.toDto(users);
        log.debug("Found requests {}", userDTOS);
        return userDTOS;
    }

    /**
     * Get all the introduceUsers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<IntroduceUserDTO> findAll(Pageable pageable) {
        log.debug("Request to get all IntroduceUsers");
        return introduceUserRepository.findAll(pageable)
            .map(introduceUserMapper::toDto);
    }

    /**
     * Get one introduceUser by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public IntroduceUserDTO findOne(Long id) {
        log.debug("Request to get IntroduceUser : {}", id);
        IntroduceUser introduceUser = introduceUserRepository.findOne(id);
        return introduceUserMapper.toDto(introduceUser);
    }

    /**
     * Delete the introduceUser by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete IntroduceUser : {}", id);
        introduceUserRepository.delete(id);
        introduceUserSearchRepository.delete(id);
    }

    /**
     * Search for the introduceUser corresponding to the query.
     *
     * @param query    the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<IntroduceUserDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of IntroduceUsers for query {}", query);
        Page<IntroduceUser> result = introduceUserSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(introduceUserMapper::toDto);
    }
}
