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

    private Long pointOneId;

    private Long pointTwoId;

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

    public Long getPointOneId() {
        return pointOneId;
    }

    public void setPointOneId(Long routePointId) {
        this.pointOneId = routePointId;
    }

    public Long getPointTwoId() {
        return pointTwoId;
    }

    public void setPointTwoId(Long routePointId) {
        this.pointTwoId = routePointId;
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
