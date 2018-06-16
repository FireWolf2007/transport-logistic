package ru.wolfa.transport.timing.service.mapper;

import ru.wolfa.transport.timing.domain.*;
import ru.wolfa.transport.timing.service.dto.RouteGraphDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RouteGraph and its DTO RouteGraphDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RouteGraphMapper extends EntityMapper<RouteGraphDTO, RouteGraph> {



    default RouteGraph fromId(Long id) {
        if (id == null) {
            return null;
        }
        RouteGraph routeGraph = new RouteGraph();
        routeGraph.setId(id);
        return routeGraph;
    }
}
