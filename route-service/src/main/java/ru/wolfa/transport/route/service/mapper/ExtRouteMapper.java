package ru.wolfa.transport.route.service.mapper;

import ru.wolfa.transport.route.domain.*;
import ru.wolfa.transport.route.service.dto.ExtRouteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Route and its DTO RouteDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ExtRouteMapper extends EntityMapper<ExtRouteDTO, Route> {

    @Mapping(target = "routePoints", ignore = true)
    ExtRouteDTO toDto(Route route);

    @Mapping(target = "routes", ignore = true)
    Route toEntity(ExtRouteDTO routeDTO);

    default Route fromId(Long id) {
        if (id == null) {
            return null;
        }
        Route route = new Route();
        route.setId(id);
        return route;
    }
}
