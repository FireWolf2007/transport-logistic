import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoutePointRouteService } from './route-point-route-service.model';
import { RoutePointRouteServicePopupService } from './route-point-route-service-popup.service';
import { RoutePointRouteServiceService } from './route-point-route-service.service';

@Component({
    selector: 'jhi-route-point-route-service-delete-dialog',
    templateUrl: './route-point-route-service-delete-dialog.component.html'
})
export class RoutePointRouteServiceDeleteDialogComponent {

    routePoint: RoutePointRouteService;

    constructor(
        private routePointService: RoutePointRouteServiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.routePointService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'routePointListModification',
                content: 'Deleted an routePoint'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-route-point-route-service-delete-popup',
    template: ''
})
export class RoutePointRouteServiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private routePointPopupService: RoutePointRouteServicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            this.routePointPopupService
                .open(RoutePointRouteServiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
