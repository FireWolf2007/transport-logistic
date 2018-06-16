package ru.wolfa.transport.route.service.impl;

import ru.wolfa.transport.route.service.RoutePointService;
import ru.wolfa.transport.route.domain.RoutePoint;
import ru.wolfa.transport.route.repository.RoutePointRepository;
import ru.wolfa.transport.route.service.dto.RoutePointDTO;
import ru.wolfa.transport.route.service.mapper.RoutePointMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing RoutePoint.
 */
@Service
@Transactional
public class RoutePointServiceImpl implements RoutePointService {

    private final Logger log = LoggerFactory.getLogger(RoutePointServiceImpl.class);

    private final RoutePointRepository routePointRepository;

    private final RoutePointMapper routePointMapper;

    public RoutePointServiceImpl(RoutePointRepository routePointRepository, RoutePointMapper routePointMapper) {
        this.routePointRepository = routePointRepository;
        this.routePointMapper = routePointMapper;
    }

    /**
     * Save a routePoint.
     *
     * @param routePointDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RoutePointDTO save(RoutePointDTO routePointDTO) {
        log.debug("Request to save RoutePoint : {}", routePointDTO);
        RoutePoint routePoint = routePointMapper.toEntity(routePointDTO);
        routePoint = routePointRepository.save(routePoint);
        return routePointMapper.toDto(routePoint);
    }

    /**
     * Get all the routePoints.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RoutePointDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RoutePoints");
        return routePointRepository.findAll(pageable)
            .map(routePointMapper::toDto);
    }

    /**
     * Get one routePoint by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RoutePointDTO findOne(Long id) {
        log.debug("Request to get RoutePoint : {}", id);
        RoutePoint routePoint = routePointRepository.findOne(id);
        return routePointMapper.toDto(routePoint);
    }

    /**
     * Delete the routePoint by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RoutePoint : {}", id);
        routePointRepository.delete(id);
    }
}
