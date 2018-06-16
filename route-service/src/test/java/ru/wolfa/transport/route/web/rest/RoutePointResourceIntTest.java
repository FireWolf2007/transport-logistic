package ru.wolfa.transport.route.web.rest;

import ru.wolfa.transport.route.RouteServiceApp;

import ru.wolfa.transport.route.domain.RoutePoint;
import ru.wolfa.transport.route.domain.Route;
import ru.wolfa.transport.route.repository.RoutePointRepository;
import ru.wolfa.transport.route.service.RoutePointService;
import ru.wolfa.transport.route.service.dto.RoutePointDTO;
import ru.wolfa.transport.route.service.mapper.RoutePointMapper;
import ru.wolfa.transport.route.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static ru.wolfa.transport.route.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RoutePointResource REST controller.
 *
 * @see RoutePointResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RouteServiceApp.class)
public class RoutePointResourceIntTest {

    @Autowired
    private RoutePointRepository routePointRepository;

    @Autowired
    private RoutePointMapper routePointMapper;

    @Autowired
    private RoutePointService routePointService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRoutePointMockMvc;

    private RoutePoint routePoint;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RoutePointResource routePointResource = new RoutePointResource(routePointService);
        this.restRoutePointMockMvc = MockMvcBuilders.standaloneSetup(routePointResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RoutePoint createEntity(EntityManager em) {
        RoutePoint routePoint = new RoutePoint();
        // Add required entity
        Route route = RouteResourceIntTest.createEntity(em);
        em.persist(route);
        em.flush();
        routePoint.setRoute(route);
        return routePoint;
    }

    @Before
    public void initTest() {
        routePoint = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoutePoint() throws Exception {
        int databaseSizeBeforeCreate = routePointRepository.findAll().size();

        // Create the RoutePoint
        RoutePointDTO routePointDTO = routePointMapper.toDto(routePoint);
        restRoutePointMockMvc.perform(post("/api/route-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routePointDTO)))
            .andExpect(status().isCreated());

        // Validate the RoutePoint in the database
        List<RoutePoint> routePointList = routePointRepository.findAll();
        assertThat(routePointList).hasSize(databaseSizeBeforeCreate + 1);
        RoutePoint testRoutePoint = routePointList.get(routePointList.size() - 1);
    }

    @Test
    @Transactional
    public void createRoutePointWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = routePointRepository.findAll().size();

        // Create the RoutePoint with an existing ID
        routePoint.setId(1L);
        RoutePointDTO routePointDTO = routePointMapper.toDto(routePoint);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoutePointMockMvc.perform(post("/api/route-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routePointDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RoutePoint in the database
        List<RoutePoint> routePointList = routePointRepository.findAll();
        assertThat(routePointList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRoutePoints() throws Exception {
        // Initialize the database
        routePointRepository.saveAndFlush(routePoint);

        // Get all the routePointList
        restRoutePointMockMvc.perform(get("/api/route-points?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(routePoint.getId().intValue())));
    }

    @Test
    @Transactional
    public void getRoutePoint() throws Exception {
        // Initialize the database
        routePointRepository.saveAndFlush(routePoint);

        // Get the routePoint
        restRoutePointMockMvc.perform(get("/api/route-points/{id}", routePoint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(routePoint.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRoutePoint() throws Exception {
        // Get the routePoint
        restRoutePointMockMvc.perform(get("/api/route-points/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoutePoint() throws Exception {
        // Initialize the database
        routePointRepository.saveAndFlush(routePoint);
        int databaseSizeBeforeUpdate = routePointRepository.findAll().size();

        // Update the routePoint
        RoutePoint updatedRoutePoint = routePointRepository.findOne(routePoint.getId());
        // Disconnect from session so that the updates on updatedRoutePoint are not directly saved in db
        em.detach(updatedRoutePoint);
        RoutePointDTO routePointDTO = routePointMapper.toDto(updatedRoutePoint);

        restRoutePointMockMvc.perform(put("/api/route-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routePointDTO)))
            .andExpect(status().isOk());

        // Validate the RoutePoint in the database
        List<RoutePoint> routePointList = routePointRepository.findAll();
        assertThat(routePointList).hasSize(databaseSizeBeforeUpdate);
        RoutePoint testRoutePoint = routePointList.get(routePointList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRoutePoint() throws Exception {
        int databaseSizeBeforeUpdate = routePointRepository.findAll().size();

        // Create the RoutePoint
        RoutePointDTO routePointDTO = routePointMapper.toDto(routePoint);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRoutePointMockMvc.perform(put("/api/route-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routePointDTO)))
            .andExpect(status().isCreated());

        // Validate the RoutePoint in the database
        List<RoutePoint> routePointList = routePointRepository.findAll();
        assertThat(routePointList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRoutePoint() throws Exception {
        // Initialize the database
        routePointRepository.saveAndFlush(routePoint);
        int databaseSizeBeforeDelete = routePointRepository.findAll().size();

        // Get the routePoint
        restRoutePointMockMvc.perform(delete("/api/route-points/{id}", routePoint.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RoutePoint> routePointList = routePointRepository.findAll();
        assertThat(routePointList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoutePoint.class);
        RoutePoint routePoint1 = new RoutePoint();
        routePoint1.setId(1L);
        RoutePoint routePoint2 = new RoutePoint();
        routePoint2.setId(routePoint1.getId());
        assertThat(routePoint1).isEqualTo(routePoint2);
        routePoint2.setId(2L);
        assertThat(routePoint1).isNotEqualTo(routePoint2);
        routePoint1.setId(null);
        assertThat(routePoint1).isNotEqualTo(routePoint2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoutePointDTO.class);
        RoutePointDTO routePointDTO1 = new RoutePointDTO();
        routePointDTO1.setId(1L);
        RoutePointDTO routePointDTO2 = new RoutePointDTO();
        assertThat(routePointDTO1).isNotEqualTo(routePointDTO2);
        routePointDTO2.setId(routePointDTO1.getId());
        assertThat(routePointDTO1).isEqualTo(routePointDTO2);
        routePointDTO2.setId(2L);
        assertThat(routePointDTO1).isNotEqualTo(routePointDTO2);
        routePointDTO1.setId(null);
        assertThat(routePointDTO1).isNotEqualTo(routePointDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(routePointMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(routePointMapper.fromId(null)).isNull();
    }
}
