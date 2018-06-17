package ru.wolfa.transport.route.service.impl;

import java.util.List;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.wolfa.transport.route.domain.RouteGraph;
import ru.wolfa.transport.route.repository.RouteGraphExtRepository;
import ru.wolfa.transport.route.service.ExtTimingService;
import ru.wolfa.transport.route.service.RouteService;
import ru.wolfa.transport.route.service.dto.RouteDTO;

@Service
@Transactional
public class ExtTimingServiceImpl implements ExtTimingService {

    @Transactional(readOnly = true)
    public Long calcTiming(List<Long> routePoints) {
        Long pointFirstId;
        Long pointSecondId = routePoints.get(0);
        long totalTime = 0;
        for (int i=1;i<routePoints.size();i++) {
            pointFirstId = pointSecondId;
            pointSecondId = routePoints.get(i);
            RouteGraph routeGraph = routeGraphExtRepository.findByPointFirstIdAndPointSecondId(pointFirstId, pointSecondId);
            if (routeGraph == null) {
                return -1L;
            }
            totalTime += routeGraph.getTime().longValue();
        }
        return Long.valueOf(totalTime);
    }

    @Async
    public void updateRoute(RouteDTO routeDTO, List<Long> routePoints) {
        routeDTO.setTime(calcTiming(routePoints).intValue());
        routeDTO.setIsReady(Boolean.TRUE);
        routeService.save(routeDTO);
    }

    public ExtTimingServiceImpl(RouteGraphExtRepository routeGraphExtRepository,
            RouteService routeService) {
        this.routeGraphExtRepository = routeGraphExtRepository;
        this.routeService = routeService;
    }

    private final RouteGraphExtRepository routeGraphExtRepository;

    private final RouteService routeService;

}
