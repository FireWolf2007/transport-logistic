package ru.wolfa.transport.route.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the RouteGraph entity.
 */
public class RouteGraphDTO implements Serializable {

    private Long id;

    private Integer time;

    private Long pointFirstId;

    private Long pointSecondId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public Long getPointFirstId() {
        return pointFirstId;
    }

    public void setPointFirstId(Long routePointId) {
        this.pointFirstId = routePointId;
    }

    public Long getPointSecondId() {
        return pointSecondId;
    }

    public void setPointSecondId(Long routePointId) {
        this.pointSecondId = routePointId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RouteGraphDTO routeGraphDTO = (RouteGraphDTO) o;
        if(routeGraphDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), routeGraphDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RouteGraphDTO{" +
            "id=" + getId() +
            ", time=" + getTime() +
            "}";
    }
}
