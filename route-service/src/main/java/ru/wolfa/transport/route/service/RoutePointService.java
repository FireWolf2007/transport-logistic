package ru.wolfa.transport.route.service;

import ru.wolfa.transport.route.service.dto.RoutePointDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing RoutePoint.
 */
public interface RoutePointService {

    /**
     * Save a routePoint.
     *
     * @param routePointDTO the entity to save
     * @return the persisted entity
     */
    RoutePointDTO save(RoutePointDTO routePointDTO);

    /**
     * Get all the routePoints.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RoutePointDTO> findAll(Pageable pageable);

    /**
     * Get the "id" routePoint.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RoutePointDTO findOne(Long id);

    /**
     * Delete the "id" routePoint.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
