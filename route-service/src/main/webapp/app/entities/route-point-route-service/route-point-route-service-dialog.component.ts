import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoutePointRouteService } from './route-point-route-service.model';
import { RoutePointRouteServicePopupService } from './route-point-route-service-popup.service';
import { RoutePointRouteServiceService } from './route-point-route-service.service';
import { RouteRouteService, RouteRouteServiceService } from '../route-route-service';

@Component({
    selector: 'jhi-route-point-route-service-dialog',
    templateUrl: './route-point-route-service-dialog.component.html'
})
export class RoutePointRouteServiceDialogComponent implements OnInit {

    routePoint: RoutePointRouteService;
    isSaving: boolean;

    routes: RouteRouteService[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private routePointService: RoutePointRouteServiceService,
        private routeService: RouteRouteServiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.routeService
            .query({filter: 'routes-is-null'})
            .subscribe((res: HttpResponse<RouteRouteService[]>) => {
                if (!this.routePoint.routeId) {
                    this.routes = res.body;
                } else {
                    this.routeService
                        .find(this.routePoint.routeId)
                        .subscribe((subRes: HttpResponse<RouteRouteService>) => {
                            this.routes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.routePoint.id !== undefined) {
            this.subscribeToSaveResponse(
                this.routePointService.update(this.routePoint));
        } else {
            this.subscribeToSaveResponse(
                this.routePointService.create(this.routePoint));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RoutePointRouteService>>) {
        result.subscribe((res: HttpResponse<RoutePointRouteService>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RoutePointRouteService) {
        this.eventManager.broadcast({ name: 'routePointListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRouteById(index: number, item: RouteRouteService) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-route-point-route-service-popup',
    template: ''
})
export class RoutePointRouteServicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private routePointPopupService: RoutePointRouteServicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( params['id'] ) {
                this.routePointPopupService
                    .open(RoutePointRouteServiceDialogComponent as Component, params['id']);
            } else {
                this.routePointPopupService
                    .open(RoutePointRouteServiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
