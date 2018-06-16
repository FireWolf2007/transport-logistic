package ru.wolfa.transport.route.web.rest;

import com.codahale.metrics.annotation.Timed;
import ru.wolfa.transport.route.service.RoutePointService;
import ru.wolfa.transport.route.web.rest.errors.BadRequestAlertException;
import ru.wolfa.transport.route.web.rest.util.HeaderUtil;
import ru.wolfa.transport.route.web.rest.util.PaginationUtil;
import ru.wolfa.transport.route.service.dto.RoutePointDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RoutePoint.
 */
@RestController
@RequestMapping("/api")
public class RoutePointResource {

    private final Logger log = LoggerFactory.getLogger(RoutePointResource.class);

    private static final String ENTITY_NAME = "routePoint";

    private final RoutePointService routePointService;

    public RoutePointResource(RoutePointService routePointService) {
        this.routePointService = routePointService;
    }

    /**
     * POST  /route-points : Create a new routePoint.
     *
     * @param routePointDTO the routePointDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new routePointDTO, or with status 400 (Bad Request) if the routePoint has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/route-points")
    @Timed
    public ResponseEntity<RoutePointDTO> createRoutePoint(@Valid @RequestBody RoutePointDTO routePointDTO) throws URISyntaxException {
        log.debug("REST request to save RoutePoint : {}", routePointDTO);
        if (routePointDTO.getId() != null) {
            throw new BadRequestAlertException("A new routePoint cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RoutePointDTO result = routePointService.save(routePointDTO);
        return ResponseEntity.created(new URI("/api/route-points/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /route-points : Updates an existing routePoint.
     *
     * @param routePointDTO the routePointDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated routePointDTO,
     * or with status 400 (Bad Request) if the routePointDTO is not valid,
     * or with status 500 (Internal Server Error) if the routePointDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/route-points")
    @Timed
    public ResponseEntity<RoutePointDTO> updateRoutePoint(@Valid @RequestBody RoutePointDTO routePointDTO) throws URISyntaxException {
        log.debug("REST request to update RoutePoint : {}", routePointDTO);
        if (routePointDTO.getId() == null) {
            return createRoutePoint(routePointDTO);
        }
        RoutePointDTO result = routePointService.save(routePointDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, routePointDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /route-points : get all the routePoints.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of routePoints in body
     */
    @GetMapping("/route-points")
    @Timed
    public ResponseEntity<List<RoutePointDTO>> getAllRoutePoints(Pageable pageable) {
        log.debug("REST request to get a page of RoutePoints");
        Page<RoutePointDTO> page = routePointService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/route-points");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /route-points/:id : get the "id" routePoint.
     *
     * @param id the id of the routePointDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the routePointDTO, or with status 404 (Not Found)
     */
    @GetMapping("/route-points/{id}")
    @Timed
    public ResponseEntity<RoutePointDTO> getRoutePoint(@PathVariable Long id) {
        log.debug("REST request to get RoutePoint : {}", id);
        RoutePointDTO routePointDTO = routePointService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(routePointDTO));
    }

    /**
     * DELETE  /route-points/:id : delete the "id" routePoint.
     *
     * @param id the id of the routePointDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/route-points/{id}")
    @Timed
    public ResponseEntity<Void> deleteRoutePoint(@PathVariable Long id) {
        log.debug("REST request to delete RoutePoint : {}", id);
        routePointService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
