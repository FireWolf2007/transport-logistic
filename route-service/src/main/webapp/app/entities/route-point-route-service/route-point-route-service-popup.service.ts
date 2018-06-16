import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RoutePointRouteService } from './route-point-route-service.model';
import { RoutePointRouteServiceService } from './route-point-route-service.service';

@Injectable()
export class RoutePointRouteServicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private routePointService: RoutePointRouteServiceService

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
                this.routePointService.find(id)
                    .subscribe((routePointResponse: HttpResponse<RoutePointRouteService>) => {
                        const routePoint: RoutePointRouteService = routePointResponse.body;
                        this.ngbModalRef = this.routePointModalRef(component, routePoint);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.routePointModalRef(component, new RoutePointRouteService());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    routePointModalRef(component: Component, routePoint: RoutePointRouteService): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.routePoint = routePoint;
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
