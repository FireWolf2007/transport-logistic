package ru.wolfa.transport.route.service.mapper;

import ru.wolfa.transport.route.domain.*;
import ru.wolfa.transport.route.service.dto.RouteGraphDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RouteGraph and its DTO RouteGraphDTO.
 */
@Mapper(componentModel = "spring", uses = {RoutePointMapper.class})
public interface RouteGraphMapper extends EntityMapper<RouteGraphDTO, RouteGraph> {

    @Mapping(source = "pointFirst.id", target = "pointFirstId")
    @Mapping(source = "pointSecond.id", target = "pointSecondId")
    RouteGraphDTO toDto(RouteGraph routeGraph);

    @Mapping(source = "pointFirstId", target = "pointFirst")
    @Mapping(source = "pointSecondId", target = "pointSecond")
    RouteGraph toEntity(RouteGraphDTO routeGraphDTO);

    default RouteGraph fromId(Long id) {
        if (id == null) {
            return null;
        }
        RouteGraph routeGraph = new RouteGraph();
        routeGraph.setId(id);
        return routeGraph;
    }
}
