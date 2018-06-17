package ru.wolfa.transport.route.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ru.wolfa.transport.route.service.dto.ExtRouteDTO;
import ru.wolfa.transport.route.service.dto.RouteDTO;

public interface RouteExtService {

    RouteDTO save(RouteDTO routeDTO, List<Long> routePoints);

    Page<ExtRouteDTO> getRoutes(Pageable pageable);

    ExtRouteDTO findOne(Long id);

}
