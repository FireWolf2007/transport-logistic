package ru.wolfa.transport.route.service.impl;

import ru.wolfa.transport.route.service.RouteService;
import ru.wolfa.transport.route.domain.Route;
import ru.wolfa.transport.route.repository.RouteRepository;
import ru.wolfa.transport.route.service.dto.RouteDTO;
import ru.wolfa.transport.route.service.mapper.RouteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Route.
 */
@Service
@Transactional
public class RouteServiceImpl implements RouteService {

    private final Logger log = LoggerFactory.getLogger(RouteServiceImpl.class);

    private final RouteRepository routeRepository;

    private final RouteMapper routeMapper;

    public RouteServiceImpl(RouteRepository routeRepository, RouteMapper routeMapper) {
        this.routeRepository = routeRepository;
        this.routeMapper = routeMapper;
    }

    /**
     * Save a route.
     *
     * @param routeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RouteDTO save(RouteDTO routeDTO) {
        log.debug("Request to save Route : {}", routeDTO);
        Route route = routeMapper.toEntity(routeDTO);
        route = routeRepository.save(route);
        return routeMapper.toDto(route);
    }

    /**
     * Get all the routes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RouteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Routes");
        return routeRepository.findAll(pageable)
            .map(routeMapper::toDto);
    }


    /**
     *  get all the routes where Routes is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<RouteDTO> findAllWhereRoutesIsNull() {
        log.debug("Request to get all routes where Routes is null");
        return StreamSupport
            .stream(routeRepository.findAll().spliterator(), false)
            .filter(route -> route.getRoutes() == null)
            .map(routeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one route by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RouteDTO findOne(Long id) {
        log.debug("Request to get Route : {}", id);
        Route route = routeRepository.findOne(id);
        return routeMapper.toDto(route);
    }

    /**
     * Delete the route by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Route : {}", id);
        routeRepository.delete(id);
    }
}
