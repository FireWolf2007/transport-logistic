import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RouteGraphTimingService } from './route-graph-timing-service.model';
import { RouteGraphTimingServiceService } from './route-graph-timing-service.service';

@Injectable()
export class RouteGraphTimingServicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private routeGraphService: RouteGraphTimingServiceService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.routeGraphService.find(id)
                    .subscribe((routeGraphResponse: HttpResponse<RouteGraphTimingService>) => {
                        const routeGraph: RouteGraphTimingService = routeGraphResponse.body;
                        this.ngbModalRef = this.routeGraphModalRef(component, routeGraph);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.routeGraphModalRef(component, new RouteGraphTimingService());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    routeGraphModalRef(component: Component, routeGraph: RouteGraphTimingService): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.routeGraph = routeGraph;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
