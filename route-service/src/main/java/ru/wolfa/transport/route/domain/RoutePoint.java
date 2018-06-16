package ru.wolfa.transport.route.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A RoutePoint.
 */
@Entity
@Table(name = "route_point")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RoutePoint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Route route;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Route getRoute() {
        return route;
    }

    public RoutePoint route(Route route) {
        this.route = route;
        return this;
    }

    public void setRoute(Route route) {
        this.route = route;
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
        RoutePoint routePoint = (RoutePoint) o;
        if (routePoint.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), routePoint.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RoutePoint{" +
            "id=" + getId() +
            "}";
    }
}
