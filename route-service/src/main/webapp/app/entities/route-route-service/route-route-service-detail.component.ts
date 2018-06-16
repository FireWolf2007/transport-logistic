import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RouteRouteService } from './route-route-service.model';
import { RouteRouteServiceService } from './route-route-service.service';

@Component({
    selector: 'jhi-route-route-service-detail',
    templateUrl: './route-route-service-detail.component.html'
})
export class RouteRouteServiceDetailComponent implements OnInit, OnDestroy {

    route: RouteRouteService;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private routeService: RouteRouteServiceService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRoutes();
    }

    load(id) {
        this.routeService.find(id)
            .subscribe((routeResponse: HttpResponse<RouteRouteService>) => {
                this.route = routeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRoutes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'routeListModification',
            (response) => this.load(this.route.id)
        );
    }
}
