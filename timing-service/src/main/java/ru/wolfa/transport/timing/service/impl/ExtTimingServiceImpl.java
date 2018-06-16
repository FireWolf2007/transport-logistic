package ru.wolfa.transport.timing.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import ru.wolfa.transport.timing.domain.RouteGraph;
import ru.wolfa.transport.timing.repository.RouteGraphExtRepository;
import ru.wolfa.transport.timing.service.ExtTimingService;

@Service
public class ExtTimingServiceImpl implements ExtTimingService {

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

    public ExtTimingServiceImpl(RouteGraphExtRepository routeGraphExtRepository) {
        this.routeGraphExtRepository = routeGraphExtRepository;
    }

    private final RouteGraphExtRepository routeGraphExtRepository;
}
