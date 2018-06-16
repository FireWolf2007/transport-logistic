package ru.wolfa.transport.route.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Route entity.
 */
public class RouteDTO implements Serializable {

    private Long id;

    private Boolean isReady;

    private Integer time;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsReady() {
        return isReady;
    }

    public void setIsReady(Boolean isReady) {
        this.isReady = isReady;
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

        RouteDTO routeDTO = (RouteDTO) o;
        if(routeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), routeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RouteDTO{" +
            "id=" + getId() +
            ", isReady='" + isIsReady() + "'" +
            ", time=" + getTime() +
            "}";
    }
}
