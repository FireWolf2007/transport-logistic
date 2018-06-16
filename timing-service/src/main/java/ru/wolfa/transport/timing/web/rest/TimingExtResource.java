package ru.wolfa.transport.timing.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.wolfa.transport.timing.service.ExtTimingService;

@RestController
@RequestMapping("/api/ext")
public class TimingExtResource {

    @PostMapping("/route-timing")
    public ResponseEntity<Long> getRouteTiming(@RequestBody List<Long> routePoints) {
        return ResponseEntity.ok(extTimingService.calcTiming(routePoints));
    }

    public TimingExtResource(ExtTimingService extTimingService) {
        this.extTimingService = extTimingService;
    }

    private final ExtTimingService extTimingService;

    private final Logger log = LoggerFactory.getLogger(TimingExtResource.class);

}
