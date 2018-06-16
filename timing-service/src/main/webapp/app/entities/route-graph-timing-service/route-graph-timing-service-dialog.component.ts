import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RouteGraphTimingService } from './route-graph-timing-service.model';
import { RouteGraphTimingServicePopupService } from './route-graph-timing-service-popup.service';
import { RouteGraphTimingServiceService } from './route-graph-timing-service.service';

@Component({
    selector: 'jhi-route-graph-timing-service-dialog',
    templateUrl: './route-graph-timing-service-dialog.component.html'
})
export class RouteGraphTimingServiceDialogComponent implements OnInit {

    routeGraph: RouteGraphTimingService;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private routeGraphService: RouteGraphTimingServiceService,
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
        if (this.routeGraph.id !== undefined) {
            this.subscribeToSaveResponse(
                this.routeGraphService.update(this.routeGraph));
        } else {
            this.subscribeToSaveResponse(
                this.routeGraphService.create(this.routeGraph));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RouteGraphTimingService>>) {
        result.subscribe((res: HttpResponse<RouteGraphTimingService>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RouteGraphTimingService) {
        this.eventManager.broadcast({ name: 'routeGraphListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-route-graph-timing-service-popup',
    template: ''
})
export class RouteGraphTimingServicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private routeGraphPopupService: RouteGraphTimingServicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.routeGraphPopupService
                    .open(RouteGraphTimingServiceDialogComponent as Component, params['id']);
            } else {
                this.routeGraphPopupService
                    .open(RouteGraphTimingServiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
