package ru.wolfa.transport.route.repository;

import ru.wolfa.transport.route.domain.Route;
import org.springframework.stereotype.Repository;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;


/**
 * Spring Data JPA repository for the Route entity.
 */
@SuppressWarnings("unused")
@Repository
@Primary
public interface ExtRouteRepository extends RouteRepository {

    /**
     * ВНИМАНИЕ! Это не очень хороший вариант, т.к. все выгребается в память и уже там делается пагинация!
     * Это проблема left outer join.
     * Если не подключать EntityGraph - то будет проблема n+1 запроса, в целом при небольших страницах это не такая уж и проблема.
     * Вариант решения - это выполнить один запрос к RoutePoints с указанием всех id.
     */
    @EntityGraph(attributePaths = "routes", type = EntityGraphType.LOAD)
    Page<Route> findAll(Pageable pageable);

    /**
     * В случае одного объекта - это самый приемлемый вариант
     */
    @EntityGraph(attributePaths = "routes", type = EntityGraphType.LOAD)
    Route findOne(Long id);
}
