import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RouteRouteServiceComponent } from './route-route-service.component';
import { RouteRouteServiceDetailComponent } from './route-route-service-detail.component';
import { RouteRouteServicePopupComponent } from './route-route-service-dialog.component';
import { RouteRouteServiceDeletePopupComponent } from './route-route-service-delete-dialog.component';

@Injectable()
export class RouteRouteServiceResolvePagingParams implements Resolve<any> {

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

export const routeRoute: Routes = [
    {
        path: 'route-route-service',
        component: RouteRouteServiceComponent,
        resolve: {
            'pagingParams': RouteRouteServiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.route.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'route-route-service/:id',
        component: RouteRouteServiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.route.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const routePopupRoute: Routes = [
    {
        path: 'route-route-service-new',
        component: RouteRouteServicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.route.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'route-route-service/:id/edit',
        component: RouteRouteServicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.route.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'route-route-service/:id/delete',
        component: RouteRouteServiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.route.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
