package ru.wolfa.transport.route.web.rest;

import ru.wolfa.transport.route.RouteServiceApp;

import ru.wolfa.transport.route.domain.Route;
import ru.wolfa.transport.route.repository.RouteRepository;
import ru.wolfa.transport.route.service.RouteService;
import ru.wolfa.transport.route.service.dto.RouteDTO;
import ru.wolfa.transport.route.service.mapper.RouteMapper;
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
 * Test class for the RouteResource REST controller.
 *
 * @see RouteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RouteServiceApp.class)
public class RouteResourceIntTest {

    private static final Boolean DEFAULT_IS_READY = false;
    private static final Boolean UPDATED_IS_READY = true;

    private static final Integer DEFAULT_TIME = 1;
    private static final Integer UPDATED_TIME = 2;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private RouteMapper routeMapper;

    @Autowired
    private RouteService routeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRouteMockMvc;

    private Route route;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RouteResource routeResource = new RouteResource(routeService);
        this.restRouteMockMvc = MockMvcBuilders.standaloneSetup(routeResource)
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
    public static Route createEntity(EntityManager em) {
        Route route = new Route()
            .isReady(DEFAULT_IS_READY)
            .time(DEFAULT_TIME);
        return route;
    }

    @Before
    public void initTest() {
        route = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoute() throws Exception {
        int databaseSizeBeforeCreate = routeRepository.findAll().size();

        // Create the Route
        RouteDTO routeDTO = routeMapper.toDto(route);
        restRouteMockMvc.perform(post("/api/routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routeDTO)))
            .andExpect(status().isCreated());

        // Validate the Route in the database
        List<Route> routeList = routeRepository.findAll();
        assertThat(routeList).hasSize(databaseSizeBeforeCreate + 1);
        Route testRoute = routeList.get(routeList.size() - 1);
        assertThat(testRoute.isIsReady()).isEqualTo(DEFAULT_IS_READY);
        assertThat(testRoute.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    @Transactional
    public void createRouteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = routeRepository.findAll().size();

        // Create the Route with an existing ID
        route.setId(1L);
        RouteDTO routeDTO = routeMapper.toDto(route);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRouteMockMvc.perform(post("/api/routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Route in the database
        List<Route> routeList = routeRepository.findAll();
        assertThat(routeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRoutes() throws Exception {
        // Initialize the database
        routeRepository.saveAndFlush(route);

        // Get all the routeList
        restRouteMockMvc.perform(get("/api/routes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(route.getId().intValue())))
            .andExpect(jsonPath("$.[*].isReady").value(hasItem(DEFAULT_IS_READY.booleanValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME)));
    }

    @Test
    @Transactional
    public void getRoute() throws Exception {
        // Initialize the database
        routeRepository.saveAndFlush(route);

        // Get the route
        restRouteMockMvc.perform(get("/api/routes/{id}", route.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(route.getId().intValue()))
            .andExpect(jsonPath("$.isReady").value(DEFAULT_IS_READY.booleanValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME));
    }

    @Test
    @Transactional
    public void getNonExistingRoute() throws Exception {
        // Get the route
        restRouteMockMvc.perform(get("/api/routes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoute() throws Exception {
        // Initialize the database
        routeRepository.saveAndFlush(route);
        int databaseSizeBeforeUpdate = routeRepository.findAll().size();

        // Update the route
        Route updatedRoute = routeRepository.findOne(route.getId());
        // Disconnect from session so that the updates on updatedRoute are not directly saved in db
        em.detach(updatedRoute);
        updatedRoute
            .isReady(UPDATED_IS_READY)
            .time(UPDATED_TIME);
        RouteDTO routeDTO = routeMapper.toDto(updatedRoute);

        restRouteMockMvc.perform(put("/api/routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routeDTO)))
            .andExpect(status().isOk());

        // Validate the Route in the database
        List<Route> routeList = routeRepository.findAll();
        assertThat(routeList).hasSize(databaseSizeBeforeUpdate);
        Route testRoute = routeList.get(routeList.size() - 1);
        assertThat(testRoute.isIsReady()).isEqualTo(UPDATED_IS_READY);
        assertThat(testRoute.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingRoute() throws Exception {
        int databaseSizeBeforeUpdate = routeRepository.findAll().size();

        // Create the Route
        RouteDTO routeDTO = routeMapper.toDto(route);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRouteMockMvc.perform(put("/api/routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routeDTO)))
            .andExpect(status().isCreated());

        // Validate the Route in the database
        List<Route> routeList = routeRepository.findAll();
        assertThat(routeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRoute() throws Exception {
        // Initialize the database
        routeRepository.saveAndFlush(route);
        int databaseSizeBeforeDelete = routeRepository.findAll().size();

        // Get the route
        restRouteMockMvc.perform(delete("/api/routes/{id}", route.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Route> routeList = routeRepository.findAll();
        assertThat(routeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Route.class);
        Route route1 = new Route();
        route1.setId(1L);
        Route route2 = new Route();
        route2.setId(route1.getId());
        assertThat(route1).isEqualTo(route2);
        route2.setId(2L);
        assertThat(route1).isNotEqualTo(route2);
        route1.setId(null);
        assertThat(route1).isNotEqualTo(route2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RouteDTO.class);
        RouteDTO routeDTO1 = new RouteDTO();
        routeDTO1.setId(1L);
        RouteDTO routeDTO2 = new RouteDTO();
        assertThat(routeDTO1).isNotEqualTo(routeDTO2);
        routeDTO2.setId(routeDTO1.getId());
        assertThat(routeDTO1).isEqualTo(routeDTO2);
        routeDTO2.setId(2L);
        assertThat(routeDTO1).isNotEqualTo(routeDTO2);
        routeDTO1.setId(null);
        assertThat(routeDTO1).isNotEqualTo(routeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(routeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(routeMapper.fromId(null)).isNull();
    }
}
