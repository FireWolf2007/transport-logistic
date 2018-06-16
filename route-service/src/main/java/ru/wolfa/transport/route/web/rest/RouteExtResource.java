package ru.wolfa.transport.route.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import ru.wolfa.transport.route.service.RouteExtService;
import ru.wolfa.transport.route.service.dto.RouteDTO;
import ru.wolfa.transport.route.web.rest.errors.BadRequestAlertException;
import ru.wolfa.transport.route.web.rest.util.HeaderUtil;

/**
 * 
 * @author sasha
 *
 */
@RestController
@RequestMapping("/api/ext")
public class RouteExtResource {


    @PostMapping("/add-route")
    @Timed
    public ResponseEntity<Long> addRoute(@RequestBody List<Integer> routePoints) throws URISyntaxException {
        log.debug("REST request to create new Route with routePoints: {}", routePoints);
        if (routePoints == null || routePoints.size() == 0) {
            throw new BadRequestAlertException("A new route cannot be empty", ENTITY_NAME, "route.points.empty");
        }
        RouteDTO dto = new RouteDTO();
        RouteDTO result = routeExtService.save(dto, routePoints);
        return ResponseEntity.created(new URI("/api/ext/add-route/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result.getId());
    }

    public RouteExtResource(RouteExtService routeExtService) {
        this.routeExtService = routeExtService;
    }

    private final RouteExtService routeExtService;

    private final Logger log = LoggerFactory.getLogger(RouteExtResource.class);

    private static final String ENTITY_NAME = "route";

}
