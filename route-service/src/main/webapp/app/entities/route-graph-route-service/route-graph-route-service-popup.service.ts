import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RouteGraphRouteService } from './route-graph-route-service.model';
import { RouteGraphRouteServiceService } from './route-graph-route-service.service';

@Injectable()
export class RouteGraphRouteServicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private routeGraphService: RouteGraphRouteServiceService

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
                    .subscribe((routeGraphResponse: HttpResponse<RouteGraphRouteService>) => {
                        const routeGraph: RouteGraphRouteService = routeGraphResponse.body;
                        this.ngbModalRef = this.routeGraphModalRef(component, routeGraph);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.routeGraphModalRef(component, new RouteGraphRouteService());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    routeGraphModalRef(component: Component, routeGraph: RouteGraphRouteService): NgbModalRef {
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
