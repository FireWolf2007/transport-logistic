package ru.wolfa.transport.route.service;

import java.util.List;

import ru.wolfa.transport.route.service.dto.RouteDTO;

public interface ExtTimingService {

    Long calcTiming(List<Long> routePoints);

    void updateRoute(RouteDTO routeDTO, List<Long> routePoints);
}
