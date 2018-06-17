package ru.wolfa.transport.route.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Маршрут
 */
@ApiModel(description = "Маршрут")
@Entity
@Table(name = "route")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Route implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Посчитано ли время на маршрут
     */
    @ApiModelProperty(value = "Посчитано ли время на маршрут")
    @Column(name = "is_ready")
    private Boolean isReady;

    /**
     * Время на маршрут в минутах
     */
    @ApiModelProperty(value = "Время на маршрут в минутах")
    @Column(name = "jhi_time")
    private Integer time;

    @OneToMany(mappedBy = "route")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RoutePoint> routes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsReady() {
        return isReady;
    }

    public Route isReady(Boolean isReady) {
        this.isReady = isReady;
        return this;
    }

    public void setIsReady(Boolean isReady) {
        this.isReady = isReady;
    }

    public Integer getTime() {
        return time;
    }

    public Route time(Integer time) {
        this.time = time;
        return this;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public Set<RoutePoint> getRoutes() {
        return routes;
    }

    public Route routes(Set<RoutePoint> routePoints) {
        this.routes = routePoints;
        return this;
    }

    public Route addRoutes(RoutePoint routePoint) {
        this.routes.add(routePoint);
        routePoint.setRoute(this);
        return this;
    }

    public Route removeRoutes(RoutePoint routePoint) {
        this.routes.remove(routePoint);
        routePoint.setRoute(null);
        return this;
    }

    public void setRoutes(Set<RoutePoint> routePoints) {
        this.routes = routePoints;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Route route = (Route) o;
        if (route.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), route.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Route{" +
            "id=" + getId() +
            ", isReady='" + isIsReady() + "'" +
            ", time=" + getTime() +
            "}";
    }
}
