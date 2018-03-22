package relas.java.service.impl;

import relas.java.domain.enumeration.GenderEnum;
import relas.java.service.UserPortfolioService;
import relas.java.domain.UserPortfolio;
import relas.java.repository.UserPortfolioRepository;
import relas.java.repository.search.UserPortfolioSearchRepository;
import relas.java.service.dto.UserPortfolioDTO;
import relas.java.service.mapper.UserPortfolioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing UserPortfolio.
 */
@Service
@Transactional
public class UserPortfolioServiceImpl implements UserPortfolioService {

    private final Logger log = LoggerFactory.getLogger(UserPortfolioServiceImpl.class);

    private final UserPortfolioRepository userPortfolioRepository;

    private final UserPortfolioMapper userPortfolioMapper;

    private final UserPortfolioSearchRepository userPortfolioSearchRepository;

    public UserPortfolioServiceImpl(UserPortfolioRepository userPortfolioRepository, UserPortfolioMapper userPortfolioMapper, UserPortfolioSearchRepository userPortfolioSearchRepository) {
        this.userPortfolioRepository = userPortfolioRepository;
        this.userPortfolioMapper = userPortfolioMapper;
        this.userPortfolioSearchRepository = userPortfolioSearchRepository;
    }

    /**
     * Save a userPortfolio.
     *
     * @param userPortfolioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UserPortfolioDTO save(UserPortfolioDTO userPortfolioDTO) {
        log.debug("Request to save UserPortfolio : {}", userPortfolioDTO);
        UserPortfolio userPortfolio = userPortfolioMapper.toEntity(userPortfolioDTO);
        userPortfolio = userPortfolioRepository.save(userPortfolio);
        UserPortfolioDTO result = userPortfolioMapper.toDto(userPortfolio);
        userPortfolioSearchRepository.save(userPortfolio);
        return result;
    }

    /**
     * Get all the userPortfolios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserPortfolioDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UserPortfolios");
        return userPortfolioRepository.findAll(pageable)
            .map(userPortfolioMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserPortfolioDTO> findGender(GenderEnum gender, Pageable pageable) {
        log.debug("Request to get UserPortfolio by gender {}", gender);
        return userPortfolioRepository.findUserPortfolioByGender(gender, pageable)
            .map(userPortfolioMapper::toDto);
    }

    /**
     * Get one userPortfolio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UserPortfolioDTO findOne(Long id) {
        log.debug("Request to get UserPortfolio : {}", id);
        UserPortfolio userPortfolio = userPortfolioRepository.findOne(id);
        return userPortfolioMapper.toDto(userPortfolio);
    }

    /**
     * Delete the userPortfolio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserPortfolio : {}", id);
        userPortfolioRepository.delete(id);
        userPortfolioSearchRepository.delete(id);
    }

    /**
     * Search for the userPortfolio corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserPortfolioDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of UserPortfolios for query {}", query);
        Page<UserPortfolio> result = userPortfolioSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(userPortfolioMapper::toDto);
    }
}
