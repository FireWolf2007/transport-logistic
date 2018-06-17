package ru.wolfa.transport.route.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ru.wolfa.transport.route.domain.Route;
import ru.wolfa.transport.route.domain.RoutePoint;
import ru.wolfa.transport.route.repository.ExtRouteRepository;
import ru.wolfa.transport.route.service.ExtTimingService;
import ru.wolfa.transport.route.service.RouteExtService;
import ru.wolfa.transport.route.service.RoutePointService;
import ru.wolfa.transport.route.service.RouteService;
import ru.wolfa.transport.route.service.dto.ExtRouteDTO;
import ru.wolfa.transport.route.service.dto.RouteDTO;
import ru.wolfa.transport.route.service.dto.RoutePointDTO;
import ru.wolfa.transport.route.service.mapper.ExtRouteMapper;

@Service
@Transactional
public class RouteExtServiceImpl implements RouteExtService {

    @Override
    public RouteDTO save(RouteDTO routeDTO, List<Long> routePoints) {
        RouteDTO result = routeService.save(routeDTO);
        for (Long routePointId : routePoints) {
            RoutePointDTO routePointDTO = new RoutePointDTO();
            routePointDTO.setRouteId(result.getId());
            routePointDTO.setId(routePointId);
            routePointService.save(routePointDTO);
        }
        extTimingService.updateRoute(result, routePoints);
        return result;
    }


    @Override
    public Page<ExtRouteDTO> getRoutes(Pageable pageable) {
        Page<Route> page = extRouteRepository.findAll(pageable);
        List<ExtRouteDTO> extRouteDTOList = new ArrayList<>();
        for (Route route : page.getContent()) {
            ExtRouteDTO extRouteDTO = extRouteMapper.toDto(route);
            // TODO Код ниже скорее всего можно заменить в интерфейсе mapper'а аннотациями
            List<Long> routePoints = new ArrayList<>();
            for (RoutePoint routePoint : route.getRoutes()) {
                routePoints.add(routePoint.getId());
            }
            extRouteDTO.setRoutePoints(routePoints);
            extRouteDTOList.add(extRouteDTO);
        }
        PageImpl<ExtRouteDTO> result = new PageImpl<>(extRouteDTOList);
        return result;
    }

    @Override
    public ExtRouteDTO findOne(Long id) {
        Route route = extRouteRepository.findOne(id);
        ExtRouteDTO extRouteDTO = extRouteMapper.toDto(route);
        // TODO Код ниже скорее всего можно заменить в интерфейсе mapper'а аннотациями
        List<Long> routePoints = new ArrayList<>();
        for (RoutePoint routePoint : route.getRoutes()) {
            routePoints.add(routePoint.getId());
        }
        extRouteDTO.setRoutePoints(routePoints);
        return extRouteDTO;
    }

    public RouteExtServiceImpl(RouteService routeService,
            RoutePointService routePointService,
            ExtRouteMapper extRouteMapper,
            ExtRouteRepository extRouteRepository,
            ExtTimingService extTimingService) {
        this.routeService = routeService;
        this.routePointService = routePointService;
        this.extRouteMapper = extRouteMapper;
        this.extRouteRepository = extRouteRepository;
        this.extTimingService = extTimingService;
    }

    private final RouteService routeService;

    private final RoutePointService routePointService;

    private final ExtRouteMapper extRouteMapper;

    private final ExtRouteRepository extRouteRepository;

    private final ExtTimingService extTimingService;


}
