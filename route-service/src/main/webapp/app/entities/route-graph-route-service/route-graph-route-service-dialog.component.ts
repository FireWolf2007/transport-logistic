import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RouteGraphRouteService } from './route-graph-route-service.model';
import { RouteGraphRouteServicePopupService } from './route-graph-route-service-popup.service';
import { RouteGraphRouteServiceService } from './route-graph-route-service.service';
import { RoutePointRouteService, RoutePointRouteServiceService } from '../route-point-route-service';

@Component({
    selector: 'jhi-route-graph-route-service-dialog',
    templateUrl: './route-graph-route-service-dialog.component.html'
})
export class RouteGraphRouteServiceDialogComponent implements OnInit {

    routeGraph: RouteGraphRouteService;
    isSaving: boolean;

    routepoints: RoutePointRouteService[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private routeGraphService: RouteGraphRouteServiceService,
        private routePointService: RoutePointRouteServiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.routePointService.query()
            .subscribe((res: HttpResponse<RoutePointRouteService[]>) => { this.routepoints = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.routeGraph.id !== undefined) {
            this.subscribeToSaveResponse(
                this.routeGraphService.update(this.routeGraph));
        } else {
            this.subscribeToSaveResponse(
                this.routeGraphService.create(this.routeGraph));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RouteGraphRouteService>>) {
        result.subscribe((res: HttpResponse<RouteGraphRouteService>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RouteGraphRouteService) {
        this.eventManager.broadcast({ name: 'routeGraphListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRoutePointById(index: number, item: RoutePointRouteService) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-route-graph-route-service-popup',
    template: ''
})
export class RouteGraphRouteServicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private routeGraphPopupService: RouteGraphRouteServicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( params['id'] ) {
                this.routeGraphPopupService
                    .open(RouteGraphRouteServiceDialogComponent as Component, params['id']);
            } else {
                this.routeGraphPopupService
                    .open(RouteGraphRouteServiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
