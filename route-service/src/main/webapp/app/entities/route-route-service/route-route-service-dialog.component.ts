import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RouteRouteService } from './route-route-service.model';
import { RouteRouteServicePopupService } from './route-route-service-popup.service';
import { RouteRouteServiceService } from './route-route-service.service';

@Component({
    selector: 'jhi-route-route-service-dialog',
    templateUrl: './route-route-service-dialog.component.html'
})
export class RouteRouteServiceDialogComponent implements OnInit {

    route: RouteRouteService;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private routeService: RouteRouteServiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.route.id !== undefined) {
            this.subscribeToSaveResponse(
                this.routeService.update(this.route));
        } else {
            this.subscribeToSaveResponse(
                this.routeService.create(this.route));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RouteRouteService>>) {
        result.subscribe((res: HttpResponse<RouteRouteService>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RouteRouteService) {
        this.eventManager.broadcast({ name: 'routeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-route-route-service-popup',
    template: ''
})
export class RouteRouteServicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private routePopupService: RouteRouteServicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( params['id'] ) {
                this.routePopupService
                    .open(RouteRouteServiceDialogComponent as Component, params['id']);
            } else {
                this.routePopupService
                    .open(RouteRouteServiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
