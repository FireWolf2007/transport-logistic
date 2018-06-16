import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RouteGraphRouteService } from './route-graph-route-service.model';
import { RouteGraphRouteServiceService } from './route-graph-route-service.service';

@Component({
    selector: 'jhi-route-graph-route-service-detail',
    templateUrl: './route-graph-route-service-detail.component.html'
})
export class RouteGraphRouteServiceDetailComponent implements OnInit, OnDestroy {

    routeGraph: RouteGraphRouteService;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private routeGraphService: RouteGraphRouteServiceService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRouteGraphs();
    }

    load(id) {
        this.routeGraphService.find(id)
            .subscribe((routeGraphResponse: HttpResponse<RouteGraphRouteService>) => {
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
