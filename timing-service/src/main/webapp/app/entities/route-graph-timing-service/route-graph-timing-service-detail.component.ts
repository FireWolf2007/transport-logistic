import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RouteGraphTimingService } from './route-graph-timing-service.model';
import { RouteGraphTimingServiceService } from './route-graph-timing-service.service';

@Component({
    selector: 'jhi-route-graph-timing-service-detail',
    templateUrl: './route-graph-timing-service-detail.component.html'
})
export class RouteGraphTimingServiceDetailComponent implements OnInit, OnDestroy {

    routeGraph: RouteGraphTimingService;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private routeGraphService: RouteGraphTimingServiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRouteGraphs();
    }

    load(id) {
        this.routeGraphService.find(id)
            .subscribe((routeGraphResponse: HttpResponse<RouteGraphTimingService>) => {
                this.routeGraph = routeGraphResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRouteGraphs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'routeGraphListModification',
            (response) => this.load(this.routeGraph.id)
        );
    }
}
