import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RouteRouteService } from './route-route-service.model';
import { RouteRouteServicePopupService } from './route-route-service-popup.service';
import { RouteRouteServiceService } from './route-route-service.service';

@Component({
    selector: 'jhi-route-route-service-delete-dialog',
    templateUrl: './route-route-service-delete-dialog.component.html'
})
export class RouteRouteServiceDeleteDialogComponent {

    route: RouteRouteService;

    constructor(
        private routeService: RouteRouteServiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.routeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'routeListModification',
                content: 'Deleted an route'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-route-route-service-delete-popup',
    template: ''
})
export class RouteRouteServiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private routePopupService: RouteRouteServicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            this.routePopupService
                .open(RouteRouteServiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
