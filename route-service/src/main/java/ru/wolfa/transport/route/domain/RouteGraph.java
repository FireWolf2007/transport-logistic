package ru.wolfa.transport.route.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A RouteGraph.
 */
@Entity
@Table(name = "route_graph")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RouteGraph implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_time")
    private Integer time;

    @ManyToOne(optional = false)
    @NotNull
    private RoutePoint pointFirst;

    @ManyToOne(optional = false)
    @NotNull
    private RoutePoint pointSecond;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTime() {
        return time;
    }

    public RouteGraph time(Integer time) {
        this.time = time;
        return this;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public RoutePoint getPointFirst() {
        return pointFirst;
    }

    public RouteGraph pointFirst(RoutePoint routePoint) {
        this.pointFirst = routePoint;
        return this;
    }

    public void setPointFirst(RoutePoint routePoint) {
        this.pointFirst = routePoint;
    }

    public RoutePoint getPointSecond() {
        return pointSecond;
    }

    public RouteGraph pointSecond(RoutePoint routePoint) {
        this.pointSecond = routePoint;
        return this;
    }

    public void setPointSecond(RoutePoint routePoint) {
        this.pointSecond = routePoint;
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
        RouteGraph routeGraph = (RouteGraph) o;
        if (routeGraph.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), routeGraph.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RouteGraph{" +
            "id=" + getId() +
            ", time=" + getTime() +
            "}";
    }
}
