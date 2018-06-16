import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RouteServiceSharedModule } from '../../shared';
import {
    RouteRouteServiceService,
    RouteRouteServicePopupService,
    RouteRouteServiceComponent,
    RouteRouteServiceDetailComponent,
    RouteRouteServiceDialogComponent,
    RouteRouteServicePopupComponent,
    RouteRouteServiceDeletePopupComponent,
    RouteRouteServiceDeleteDialogComponent,
    routeRoute,
    routePopupRoute,
    RouteRouteServiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...routeRoute,
    ...routePopupRoute,
];

@NgModule({
    imports: [
        RouteServiceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RouteRouteServiceComponent,
        RouteRouteServiceDetailComponent,
        RouteRouteServiceDialogComponent,
        RouteRouteServiceDeleteDialogComponent,
        RouteRouteServicePopupComponent,
        RouteRouteServiceDeletePopupComponent,
    ],
    entryComponents: [
        RouteRouteServiceComponent,
        RouteRouteServiceDialogComponent,
        RouteRouteServicePopupComponent,
        RouteRouteServiceDeleteDialogComponent,
        RouteRouteServiceDeletePopupComponent,
    ],
    providers: [
        RouteRouteServiceService,
        RouteRouteServicePopupService,
        RouteRouteServiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RouteServiceRouteRouteServiceModule {}
