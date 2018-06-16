package ru.wolfa.transport.route.service;

import java.util.List;

import ru.wolfa.transport.route.service.dto.RouteDTO;

public interface RouteExtService {
    RouteDTO save(RouteDTO routeDTO, List<Integer> routePoints);
}
