package ru.wolfa.transport.timing.repository;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import ru.wolfa.transport.timing.domain.RouteGraph;

@Repository
@Primary
public interface RouteGraphExtRepository extends RouteGraphRepository {

    RouteGraph findByPointFirstIdAndPointSecondId(Long pointFirstId, Long pointSecondId);

}
