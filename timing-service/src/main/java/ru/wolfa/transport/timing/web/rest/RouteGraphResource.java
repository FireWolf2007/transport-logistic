package ru.wolfa.transport.timing.web.rest;

import com.codahale.metrics.annotation.Timed;
import ru.wolfa.transport.timing.service.RouteGraphService;
import ru.wolfa.transport.timing.web.rest.errors.BadRequestAlertException;
import ru.wolfa.transport.timing.web.rest.util.HeaderUtil;
import ru.wolfa.transport.timing.web.rest.util.PaginationUtil;
import ru.wolfa.transport.timing.service.dto.RouteGraphDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RouteGraph.
 */
@RestController
@RequestMapping("/api")
public class RouteGraphResource {

    private final Logger log = LoggerFactory.getLogger(RouteGraphResource.class);

    private static final String ENTITY_NAME = "routeGraph";

    private final RouteGraphService routeGraphService;

    public RouteGraphResource(RouteGraphService routeGraphService) {
        this.routeGraphService = routeGraphService;
    }

    /**
     * POST  /route-graphs : Create a new routeGraph.
     *
     * @param routeGraphDTO the routeGraphDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new routeGraphDTO, or with status 400 (Bad Request) if the routeGraph has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/route-graphs")
    @Timed
    public ResponseEntity<RouteGraphDTO> createRouteGraph(@RequestBody RouteGraphDTO routeGraphDTO) throws URISyntaxException {
        log.debug("REST request to save RouteGraph : {}", routeGraphDTO);
        if (routeGraphDTO.getId() != null) {
            throw new BadRequestAlertException("A new routeGraph cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RouteGraphDTO result = routeGraphService.save(routeGraphDTO);
        return ResponseEntity.created(new URI("/api/route-graphs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /route-graphs : Updates an existing routeGraph.
     *
     * @param routeGraphDTO the routeGraphDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated routeGraphDTO,
     * or with status 400 (Bad Request) if the routeGraphDTO is not valid,
     * or with status 500 (Internal Server Error) if the routeGraphDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/route-graphs")
    @Timed
    public ResponseEntity<RouteGraphDTO> updateRouteGraph(@RequestBody RouteGraphDTO routeGraphDTO) throws URISyntaxException {
        log.debug("REST request to update RouteGraph : {}", routeGraphDTO);
        if (routeGraphDTO.getId() == null) {
            return createRouteGraph(routeGraphDTO);
        }
        RouteGraphDTO result = routeGraphService.save(routeGraphDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, routeGraphDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /route-graphs : get all the routeGraphs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of routeGraphs in body
     */
    @GetMapping("/route-graphs")
    @Timed
    public ResponseEntity<List<RouteGraphDTO>> getAllRouteGraphs(Pageable pageable) {
        log.debug("REST request to get a page of RouteGraphs");
        Page<RouteGraphDTO> page = routeGraphService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/route-graphs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /route-graphs/:id : get the "id" routeGraph.
     *
     * @param id the id of the routeGraphDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the routeGraphDTO, or with status 404 (Not Found)
     */
    @GetMapping("/route-graphs/{id}")
    @Timed
    public ResponseEntity<RouteGraphDTO> getRouteGraph(@PathVariable Long id) {
        log.debug("REST request to get RouteGraph : {}", id);
        RouteGraphDTO routeGraphDTO = routeGraphService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(routeGraphDTO));
    }

    /**
     * DELETE  /route-graphs/:id : delete the "id" routeGraph.
     *
     * @param id the id of the routeGraphDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/route-graphs/{id}")
    @Timed
    public ResponseEntity<Void> deleteRouteGraph(@PathVariable Long id) {
        log.debug("REST request to delete RouteGraph : {}", id);
        routeGraphService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
