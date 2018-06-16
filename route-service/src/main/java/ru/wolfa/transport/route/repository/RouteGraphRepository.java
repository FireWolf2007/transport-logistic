package ru.wolfa.transport.route.repository;

import ru.wolfa.transport.route.domain.RouteGraph;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RouteGraph entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RouteGraphRepository extends JpaRepository<RouteGraph, Long> {

}
