import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RoutePointRouteServiceComponent } from './route-point-route-service.component';
import { RoutePointRouteServiceDetailComponent } from './route-point-route-service-detail.component';
import { RoutePointRouteServicePopupComponent } from './route-point-route-service-dialog.component';
import { RoutePointRouteServiceDeletePopupComponent } from './route-point-route-service-delete-dialog.component';

@Injectable()
export class RoutePointRouteServiceResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const routePointRoute: Routes = [
    {
        path: 'route-point-route-service',
        component: RoutePointRouteServiceComponent,
        resolve: {
            'pagingParams': RoutePointRouteServiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.routePoint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'route-point-route-service/:id',
        component: RoutePointRouteServiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.routePoint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const routePointPopupRoute: Routes = [
    {
        path: 'route-point-route-service-new',
        component: RoutePointRouteServicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.routePoint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'route-point-route-service/:id/edit',
        component: RoutePointRouteServicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.routePoint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'route-point-route-service/:id/delete',
        component: RoutePointRouteServiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.routePoint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
