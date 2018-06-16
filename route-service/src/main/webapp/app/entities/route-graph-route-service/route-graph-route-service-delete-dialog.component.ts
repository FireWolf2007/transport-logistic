import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RouteGraphRouteService } from './route-graph-route-service.model';
import { RouteGraphRouteServicePopupService } from './route-graph-route-service-popup.service';
import { RouteGraphRouteServiceService } from './route-graph-route-service.service';

@Component({
    selector: 'jhi-route-graph-route-service-delete-dialog',
    templateUrl: './route-graph-route-service-delete-dialog.component.html'
})
export class RouteGraphRouteServiceDeleteDialogComponent {

    routeGraph: RouteGraphRouteService;

    constructor(
        private routeGraphService: RouteGraphRouteServiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.routeGraphService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'routeGraphListModification',
                content: 'Deleted an routeGraph'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-route-graph-route-service-delete-popup',
    template: ''
})
export class RouteGraphRouteServiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private routeGraphPopupService: RouteGraphRouteServicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            this.routeGraphPopupService
                .open(RouteGraphRouteServiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
