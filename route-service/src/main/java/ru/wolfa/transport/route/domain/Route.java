package ru.wolfa.transport.route.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Route.
 */
@Entity
@Table(name = "route")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Route implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "is_ready")
    private Boolean isReady;

    @Column(name = "jhi_time")
    private Integer time;

    @OneToOne(mappedBy = "route")
    @JsonIgnore
    private RoutePoint routes;

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

    public RoutePoint getRoutes() {
        return routes;
    }

    public Route routes(RoutePoint routePoint) {
        this.routes = routePoint;
        return this;
    }

    public void setRoutes(RoutePoint routePoint) {
        this.routes = routePoint;
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
