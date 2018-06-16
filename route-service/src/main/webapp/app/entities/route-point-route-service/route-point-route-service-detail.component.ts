import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoutePointRouteService } from './route-point-route-service.model';
import { RoutePointRouteServiceService } from './route-point-route-service.service';

@Component({
    selector: 'jhi-route-point-route-service-detail',
    templateUrl: './route-point-route-service-detail.component.html'
})
export class RoutePointRouteServiceDetailComponent implements OnInit, OnDestroy {

    routePoint: RoutePointRouteService;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private routePointService: RoutePointRouteServiceService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRoutePoints();
    }

    load(id) {
        this.routePointService.find(id)
            .subscribe((routePointResponse: HttpResponse<RoutePointRouteService>) => {
                this.routePoint = routePointResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRoutePoints() {
        this.eventSubscriber = this.eventManager.subscribe(
            'routePointListModification',
            (response) => this.load(this.routePoint.id)
        );
    }
}
