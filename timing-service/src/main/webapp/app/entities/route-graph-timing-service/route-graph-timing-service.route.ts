import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RouteGraphTimingServiceComponent } from './route-graph-timing-service.component';
import { RouteGraphTimingServiceDetailComponent } from './route-graph-timing-service-detail.component';
import { RouteGraphTimingServicePopupComponent } from './route-graph-timing-service-dialog.component';
import { RouteGraphTimingServiceDeletePopupComponent } from './route-graph-timing-service-delete-dialog.component';

@Injectable()
export class RouteGraphTimingServiceResolvePagingParams implements Resolve<any> {

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
        path: 'route-graph-timing-service',
        component: RouteGraphTimingServiceComponent,
        resolve: {
            'pagingParams': RouteGraphTimingServiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'timingServiceApp.routeGraph.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'route-graph-timing-service/:id',
        component: RouteGraphTimingServiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'timingServiceApp.routeGraph.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const routeGraphPopupRoute: Routes = [
    {
        path: 'route-graph-timing-service-new',
        component: RouteGraphTimingServicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'timingServiceApp.routeGraph.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'route-graph-timing-service/:id/edit',
        component: RouteGraphTimingServicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'timingServiceApp.routeGraph.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'route-graph-timing-service/:id/delete',
        component: RouteGraphTimingServiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'timingServiceApp.routeGraph.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
