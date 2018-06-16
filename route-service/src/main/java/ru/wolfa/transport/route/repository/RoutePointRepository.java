package ru.wolfa.transport.route.repository;

import ru.wolfa.transport.route.domain.RoutePoint;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RoutePoint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoutePointRepository extends JpaRepository<RoutePoint, Long> {

}
