package ru.wolfa.transport.route.web.rest;

import ru.wolfa.transport.route.RouteServiceApp;

import ru.wolfa.transport.route.domain.RouteGraph;
import ru.wolfa.transport.route.domain.RoutePoint;
import ru.wolfa.transport.route.domain.RoutePoint;
import ru.wolfa.transport.route.repository.RouteGraphRepository;
import ru.wolfa.transport.route.service.RouteGraphService;
import ru.wolfa.transport.route.service.dto.RouteGraphDTO;
import ru.wolfa.transport.route.service.mapper.RouteGraphMapper;
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
 * Test class for the RouteGraphResource REST controller.
 *
 * @see RouteGraphResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RouteServiceApp.class)
public class RouteGraphResourceIntTest {

    private static final Integer DEFAULT_TIME = 1;
    private static final Integer UPDATED_TIME = 2;

    @Autowired
    private RouteGraphRepository routeGraphRepository;

    @Autowired
    private RouteGraphMapper routeGraphMapper;

    @Autowired
    private RouteGraphService routeGraphService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRouteGraphMockMvc;

    private RouteGraph routeGraph;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RouteGraphResource routeGraphResource = new RouteGraphResource(routeGraphService);
        this.restRouteGraphMockMvc = MockMvcBuilders.standaloneSetup(routeGraphResource)
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
    public static RouteGraph createEntity(EntityManager em) {
        RouteGraph routeGraph = new RouteGraph()
            .time(DEFAULT_TIME);
        // Add required entity
        RoutePoint pointOne = RoutePointResourceIntTest.createEntity(em);
        em.persist(pointOne);
        em.flush();
        routeGraph.setPointOne(pointOne);
        // Add required entity
        RoutePoint pointTwo = RoutePointResourceIntTest.createEntity(em);
        em.persist(pointTwo);
        em.flush();
        routeGraph.setPointTwo(pointTwo);
        return routeGraph;
    }

    @Before
    public void initTest() {
        routeGraph = createEntity(em);
    }

    @Test
    @Transactional
    public void createRouteGraph() throws Exception {
        int databaseSizeBeforeCreate = routeGraphRepository.findAll().size();

        // Create the RouteGraph
        RouteGraphDTO routeGraphDTO = routeGraphMapper.toDto(routeGraph);
        restRouteGraphMockMvc.perform(post("/api/route-graphs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routeGraphDTO)))
            .andExpect(status().isCreated());

        // Validate the RouteGraph in the database
        List<RouteGraph> routeGraphList = routeGraphRepository.findAll();
        assertThat(routeGraphList).hasSize(databaseSizeBeforeCreate + 1);
        RouteGraph testRouteGraph = routeGraphList.get(routeGraphList.size() - 1);
        assertThat(testRouteGraph.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    @Transactional
    public void createRouteGraphWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = routeGraphRepository.findAll().size();

        // Create the RouteGraph with an existing ID
        routeGraph.setId(1L);
        RouteGraphDTO routeGraphDTO = routeGraphMapper.toDto(routeGraph);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRouteGraphMockMvc.perform(post("/api/route-graphs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routeGraphDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RouteGraph in the database
        List<RouteGraph> routeGraphList = routeGraphRepository.findAll();
        assertThat(routeGraphList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRouteGraphs() throws Exception {
        // Initialize the database
        routeGraphRepository.saveAndFlush(routeGraph);

        // Get all the routeGraphList
        restRouteGraphMockMvc.perform(get("/api/route-graphs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(routeGraph.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME)));
    }

    @Test
    @Transactional
    public void getRouteGraph() throws Exception {
        // Initialize the database
        routeGraphRepository.saveAndFlush(routeGraph);

        // Get the routeGraph
        restRouteGraphMockMvc.perform(get("/api/route-graphs/{id}", routeGraph.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(routeGraph.getId().intValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME));
    }

    @Test
    @Transactional
    public void getNonExistingRouteGraph() throws Exception {
        // Get the routeGraph
        restRouteGraphMockMvc.perform(get("/api/route-graphs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRouteGraph() throws Exception {
        // Initialize the database
        routeGraphRepository.saveAndFlush(routeGraph);
        int databaseSizeBeforeUpdate = routeGraphRepository.findAll().size();

        // Update the routeGraph
        RouteGraph updatedRouteGraph = routeGraphRepository.findOne(routeGraph.getId());
        // Disconnect from session so that the updates on updatedRouteGraph are not directly saved in db
        em.detach(updatedRouteGraph);
        updatedRouteGraph
            .time(UPDATED_TIME);
        RouteGraphDTO routeGraphDTO = routeGraphMapper.toDto(updatedRouteGraph);

        restRouteGraphMockMvc.perform(put("/api/route-graphs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routeGraphDTO)))
            .andExpect(status().isOk());

        // Validate the RouteGraph in the database
        List<RouteGraph> routeGraphList = routeGraphRepository.findAll();
        assertThat(routeGraphList).hasSize(databaseSizeBeforeUpdate);
        RouteGraph testRouteGraph = routeGraphList.get(routeGraphList.size() - 1);
        assertThat(testRouteGraph.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingRouteGraph() throws Exception {
        int databaseSizeBeforeUpdate = routeGraphRepository.findAll().size();

        // Create the RouteGraph
        RouteGraphDTO routeGraphDTO = routeGraphMapper.toDto(routeGraph);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRouteGraphMockMvc.perform(put("/api/route-graphs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routeGraphDTO)))
            .andExpect(status().isCreated());

        // Validate the RouteGraph in the database
        List<RouteGraph> routeGraphList = routeGraphRepository.findAll();
        assertThat(routeGraphList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRouteGraph() throws Exception {
        // Initialize the database
        routeGraphRepository.saveAndFlush(routeGraph);
        int databaseSizeBeforeDelete = routeGraphRepository.findAll().size();

        // Get the routeGraph
        restRouteGraphMockMvc.perform(delete("/api/route-graphs/{id}", routeGraph.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RouteGraph> routeGraphList = routeGraphRepository.findAll();
        assertThat(routeGraphList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RouteGraph.class);
        RouteGraph routeGraph1 = new RouteGraph();
        routeGraph1.setId(1L);
        RouteGraph routeGraph2 = new RouteGraph();
        routeGraph2.setId(routeGraph1.getId());
        assertThat(routeGraph1).isEqualTo(routeGraph2);
        routeGraph2.setId(2L);
        assertThat(routeGraph1).isNotEqualTo(routeGraph2);
        routeGraph1.setId(null);
        assertThat(routeGraph1).isNotEqualTo(routeGraph2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RouteGraphDTO.class);
        RouteGraphDTO routeGraphDTO1 = new RouteGraphDTO();
        routeGraphDTO1.setId(1L);
        RouteGraphDTO routeGraphDTO2 = new RouteGraphDTO();
        assertThat(routeGraphDTO1).isNotEqualTo(routeGraphDTO2);
        routeGraphDTO2.setId(routeGraphDTO1.getId());
        assertThat(routeGraphDTO1).isEqualTo(routeGraphDTO2);
        routeGraphDTO2.setId(2L);
        assertThat(routeGraphDTO1).isNotEqualTo(routeGraphDTO2);
        routeGraphDTO1.setId(null);
        assertThat(routeGraphDTO1).isNotEqualTo(routeGraphDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(routeGraphMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(routeGraphMapper.fromId(null)).isNull();
    }
}
