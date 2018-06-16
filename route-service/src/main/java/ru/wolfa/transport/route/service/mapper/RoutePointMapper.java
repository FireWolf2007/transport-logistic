package ru.wolfa.transport.route.service.mapper;

import ru.wolfa.transport.route.domain.*;
import ru.wolfa.transport.route.service.dto.RoutePointDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RoutePoint and its DTO RoutePointDTO.
 */
@Mapper(componentModel = "spring", uses = {RouteMapper.class})
public interface RoutePointMapper extends EntityMapper<RoutePointDTO, RoutePoint> {

    @Mapping(source = "route.id", target = "routeId")
    RoutePointDTO toDto(RoutePoint routePoint);

    @Mapping(source = "routeId", target = "route")
    RoutePoint toEntity(RoutePointDTO routePointDTO);

    default RoutePoint fromId(Long id) {
        if (id == null) {
            return null;
        }
        RoutePoint routePoint = new RoutePoint();
        routePoint.setId(id);
        return routePoint;
    }
}
