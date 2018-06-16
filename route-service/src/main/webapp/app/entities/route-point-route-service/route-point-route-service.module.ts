import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RouteServiceSharedModule } from '../../shared';
import {
    RoutePointRouteServiceService,
    RoutePointRouteServicePopupService,
    RoutePointRouteServiceComponent,
    RoutePointRouteServiceDetailComponent,
    RoutePointRouteServiceDialogComponent,
    RoutePointRouteServicePopupComponent,
    RoutePointRouteServiceDeletePopupComponent,
    RoutePointRouteServiceDeleteDialogComponent,
    routePointRoute,
    routePointPopupRoute,
    RoutePointRouteServiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...routePointRoute,
    ...routePointPopupRoute,
];

@NgModule({
    imports: [
        RouteServiceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoutePointRouteServiceComponent,
        RoutePointRouteServiceDetailComponent,
        RoutePointRouteServiceDialogComponent,
        RoutePointRouteServiceDeleteDialogComponent,
        RoutePointRouteServicePopupComponent,
        RoutePointRouteServiceDeletePopupComponent,
    ],
    entryComponents: [
        RoutePointRouteServiceComponent,
        RoutePointRouteServiceDialogComponent,
        RoutePointRouteServicePopupComponent,
        RoutePointRouteServiceDeleteDialogComponent,
        RoutePointRouteServiceDeletePopupComponent,
    ],
    providers: [
        RoutePointRouteServiceService,
        RoutePointRouteServicePopupService,
        RoutePointRouteServiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RouteServiceRoutePointRouteServiceModule {}
