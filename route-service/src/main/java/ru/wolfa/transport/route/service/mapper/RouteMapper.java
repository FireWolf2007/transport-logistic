package ru.wolfa.transport.route.service.mapper;

import ru.wolfa.transport.route.domain.*;
import ru.wolfa.transport.route.service.dto.RouteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Route and its DTO RouteDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RouteMapper extends EntityMapper<RouteDTO, Route> {


    @Mapping(target = "routes", ignore = true)
    Route toEntity(RouteDTO routeDTO);

    default Route fromId(Long id) {
        if (id == null) {
            return null;
        }
        Route route = new Route();
        route.setId(id);
        return route;
    }
}
