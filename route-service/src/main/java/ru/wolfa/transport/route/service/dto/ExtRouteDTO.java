package ru.wolfa.transport.route.service.dto;

import java.util.List;

public class ExtRouteDTO extends RouteDTO {

    private List<Long> routePoints;

    public List<Long> getRoutePoints() {
        return routePoints;
    }

    public void setRoutePoints(List<Long> routePoints) {
        this.routePoints = routePoints;
    }

    @Override
    public String toString() {
        return "RouteDTO{" +
            "id=" + getId() +
            ", isReady='" + isIsReady() + "'" +
            ", time=" + getTime() +
            ", routePoints=" + getRoutePoints()
            + "}";
    }

}
