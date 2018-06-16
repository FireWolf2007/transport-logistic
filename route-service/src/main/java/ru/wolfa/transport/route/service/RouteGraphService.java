package ru.wolfa.transport.route.service;

import ru.wolfa.transport.route.service.dto.RouteGraphDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing RouteGraph.
 */
public interface RouteGraphService {

    /**
     * Save a routeGraph.
     *
     * @param routeGraphDTO the entity to save
     * @return the persisted entity
     */
    RouteGraphDTO save(RouteGraphDTO routeGraphDTO);

    /**
     * Get all the routeGraphs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RouteGraphDTO> findAll(Pageable pageable);

    /**
     * Get the "id" routeGraph.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RouteGraphDTO findOne(Long id);

    /**
     * Delete the "id" routeGraph.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
