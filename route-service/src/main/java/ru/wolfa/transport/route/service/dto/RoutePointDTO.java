package ru.wolfa.transport.route.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the RoutePoint entity.
 */
public class RoutePointDTO implements Serializable {

    private Long id;

    private Long routeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRouteId() {
        return routeId;
    }

    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RoutePointDTO routePointDTO = (RoutePointDTO) o;
        if(routePointDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), routePointDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RoutePointDTO{" +
            "id=" + getId() +
            "}";
    }
}
