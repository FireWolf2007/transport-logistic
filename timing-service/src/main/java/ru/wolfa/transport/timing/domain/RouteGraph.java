package ru.wolfa.transport.timing.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * Граф точек маршрута
 */
@ApiModel(description = "Граф точек маршрута")
@Entity
@Table(name = "route_graph")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RouteGraph implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Первая точка маршрута
     */
    @ApiModelProperty(value = "Первая точка маршрута")
    @Column(name = "point_first_id")
    private Long pointFirstId;

    /**
     * Вторая точка маршрута
     */
    @ApiModelProperty(value = "Вторая точка маршрута")
    @Column(name = "point_second_id")
    private Long pointSecondId;

    /**
     * Время на маршрут в минутах
     */
    @ApiModelProperty(value = "Время на маршрут в минутах")
    @Column(name = "jhi_time")
    private Integer time;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPointFirstId() {
        return pointFirstId;
    }

    public RouteGraph pointFirstId(Long pointFirstId) {
        this.pointFirstId = pointFirstId;
        return this;
    }

    public void setPointFirstId(Long pointFirstId) {
        this.pointFirstId = pointFirstId;
    }

    public Long getPointSecondId() {
        return pointSecondId;
    }

    public RouteGraph pointSecondId(Long pointSecondId) {
        this.pointSecondId = pointSecondId;
        return this;
    }

    public void setPointSecondId(Long pointSecondId) {
        this.pointSecondId = pointSecondId;
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
            ", pointFirstId=" + getPointFirstId() +
            ", pointSecondId=" + getPointSecondId() +
            ", time=" + getTime() +
            "}";
    }
}
