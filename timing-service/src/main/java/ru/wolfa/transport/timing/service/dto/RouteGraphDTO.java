package ru.wolfa.transport.timing.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the RouteGraph entity.
 */
public class RouteGraphDTO implements Serializable {

    private Long id;

    private Long pointFirstId;

    private Long pointSecondId;

    private Integer time;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPointFirstId() {
        return pointFirstId;
    }

    public void setPointFirstId(Long pointFirstId) {
        this.pointFirstId = pointFirstId;
    }

    public Long getPointSecondId() {
        return pointSecondId;
    }

    public void setPointSecondId(Long pointSecondId) {
        this.pointSecondId = pointSecondId;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
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
            ", pointFirstId=" + getPointFirstId() +
            ", pointSecondId=" + getPointSecondId() +
            ", time=" + getTime() +
            "}";
    }
}
