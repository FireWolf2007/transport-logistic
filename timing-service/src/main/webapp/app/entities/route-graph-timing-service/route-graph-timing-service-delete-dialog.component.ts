import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RouteGraphTimingService } from './route-graph-timing-service.model';
import { RouteGraphTimingServicePopupService } from './route-graph-timing-service-popup.service';
import { RouteGraphTimingServiceService } from './route-graph-timing-service.service';

@Component({
    selector: 'jhi-route-graph-timing-service-delete-dialog',
    templateUrl: './route-graph-timing-service-delete-dialog.component.html'
})
export class RouteGraphTimingServiceDeleteDialogComponent {

    routeGraph: RouteGraphTimingService;

    constructor(
        private routeGraphService: RouteGraphTimingServiceService,
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
    selector: 'jhi-route-graph-timing-service-delete-popup',
    template: ''
})
export class RouteGraphTimingServiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private routeGraphPopupService: RouteGraphTimingServicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.routeGraphPopupService
                .open(RouteGraphTimingServiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
