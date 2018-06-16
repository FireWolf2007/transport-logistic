package ru.wolfa.transport.route.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import ru.wolfa.transport.route.service.RouteExtService;
import ru.wolfa.transport.route.service.RoutePointService;
import ru.wolfa.transport.route.service.RouteService;
import ru.wolfa.transport.route.service.dto.RouteDTO;
import ru.wolfa.transport.route.service.dto.RoutePointDTO;

@Service
@Transactional
public class RouteExtServiceImpl implements RouteExtService {

    @Override
    public RouteDTO save(RouteDTO routeDTO, List<Integer> routePoints) {
        RouteDTO result = routeService.save(routeDTO);
        for (Integer routePointId : routePoints) {
            RoutePointDTO routePointDTO = new RoutePointDTO();
            routePointDTO.setRouteId(result.getId());
            routePointDTO.setId(Long.valueOf(routePointId.longValue()));
            routePointService.save(routePointDTO);
        }
        // FIXME Call async routeTimeCalc
        return result;
    }

    public RouteExtServiceImpl(RouteService routeService,
            RoutePointService routePointService) {
        this.routeService = routeService;
        this.routePointService = routePointService;
    }

    private final RouteService routeService;

    private final RoutePointService routePointService;

}
