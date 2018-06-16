import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RouteGraphRouteServiceComponent } from './route-graph-route-service.component';
import { RouteGraphRouteServiceDetailComponent } from './route-graph-route-service-detail.component';
import { RouteGraphRouteServicePopupComponent } from './route-graph-route-service-dialog.component';
import { RouteGraphRouteServiceDeletePopupComponent } from './route-graph-route-service-delete-dialog.component';

@Injectable()
export class RouteGraphRouteServiceResolvePagingParams implements Resolve<any> {

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

export const routeGraphRoute: Routes = [
    {
        path: 'route-graph-route-service',
        component: RouteGraphRouteServiceComponent,
        resolve: {
            'pagingParams': RouteGraphRouteServiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.routeGraph.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'route-graph-route-service/:id',
        component: RouteGraphRouteServiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.routeGraph.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const routeGraphPopupRoute: Routes = [
    {
        path: 'route-graph-route-service-new',
        component: RouteGraphRouteServicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.routeGraph.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'route-graph-route-service/:id/edit',
        component: RouteGraphRouteServicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.routeGraph.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'route-graph-route-service/:id/delete',
        component: RouteGraphRouteServiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'routeServiceApp.routeGraph.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
