package ru.wolfa.transport.timing.service.impl;

import ru.wolfa.transport.timing.service.RouteGraphService;
import ru.wolfa.transport.timing.domain.RouteGraph;
import ru.wolfa.transport.timing.repository.RouteGraphRepository;
import ru.wolfa.transport.timing.service.dto.RouteGraphDTO;
import ru.wolfa.transport.timing.service.mapper.RouteGraphMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing RouteGraph.
 */
@Service
@Transactional
public class RouteGraphServiceImpl implements RouteGraphService {

    private final Logger log = LoggerFactory.getLogger(RouteGraphServiceImpl.class);

    private final RouteGraphRepository routeGraphRepository;

    private final RouteGraphMapper routeGraphMapper;

    public RouteGraphServiceImpl(RouteGraphRepository routeGraphRepository, RouteGraphMapper routeGraphMapper) {
        this.routeGraphRepository = routeGraphRepository;
        this.routeGraphMapper = routeGraphMapper;
    }

    /**
     * Save a routeGraph.
     *
     * @param routeGraphDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RouteGraphDTO save(RouteGraphDTO routeGraphDTO) {
        log.debug("Request to save RouteGraph : {}", routeGraphDTO);
        RouteGraph routeGraph = routeGraphMapper.toEntity(routeGraphDTO);
        routeGraph = routeGraphRepository.save(routeGraph);
        return routeGraphMapper.toDto(routeGraph);
    }

    /**
     * Get all the routeGraphs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RouteGraphDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RouteGraphs");
        return routeGraphRepository.findAll(pageable)
            .map(routeGraphMapper::toDto);
    }

    /**
     * Get one routeGraph by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RouteGraphDTO findOne(Long id) {
        log.debug("Request to get RouteGraph : {}", id);
        RouteGraph routeGraph = routeGraphRepository.findOne(id);
        return routeGraphMapper.toDto(routeGraph);
    }

    /**
     * Delete the routeGraph by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RouteGraph : {}", id);
        routeGraphRepository.delete(id);
    }
}
