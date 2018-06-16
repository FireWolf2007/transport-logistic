package ru.wolfa.transport.route.service;

import ru.wolfa.transport.route.service.dto.RouteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Route.
 */
public interface RouteService {

    /**
     * Save a route.
     *
     * @param routeDTO the entity to save
     * @return the persisted entity
     */
    RouteDTO save(RouteDTO routeDTO);

    /**
     * Get all the routes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RouteDTO> findAll(Pageable pageable);
    /**
     * Get all the RouteDTO where Routes is null.
     *
     * @return the list of entities
     */
    List<RouteDTO> findAllWhereRoutesIsNull();

    /**
     * Get the "id" route.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RouteDTO findOne(Long id);

    /**
     * Delete the "id" route.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
