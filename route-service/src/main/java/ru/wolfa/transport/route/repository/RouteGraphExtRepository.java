package ru.wolfa.transport.route.repository;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import ru.wolfa.transport.route.domain.RouteGraph;

@Repository
@Primary
public interface RouteGraphExtRepository extends RouteGraphRepository {

    RouteGraph findByPointFirstIdAndPointSecondId(Long pointFirstId, Long pointSecondId);

}
