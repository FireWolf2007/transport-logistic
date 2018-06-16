import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RouteServiceSharedModule } from '../../shared';
import {
    RouteGraphRouteServiceService,
    RouteGraphRouteServicePopupService,
    RouteGraphRouteServiceComponent,
    RouteGraphRouteServiceDetailComponent,
    RouteGraphRouteServiceDialogComponent,
    RouteGraphRouteServicePopupComponent,
    RouteGraphRouteServiceDeletePopupComponent,
    RouteGraphRouteServiceDeleteDialogComponent,
    routeGraphRoute,
    routeGraphPopupRoute,
    RouteGraphRouteServiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...routeGraphRoute,
    ...routeGraphPopupRoute,
];

@NgModule({
    imports: [
        RouteServiceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RouteGraphRouteServiceComponent,
        RouteGraphRouteServiceDetailComponent,
        RouteGraphRouteServiceDialogComponent,
        RouteGraphRouteServiceDeleteDialogComponent,
        RouteGraphRouteServicePopupComponent,
        RouteGraphRouteServiceDeletePopupComponent,
    ],
    entryComponents: [
        RouteGraphRouteServiceComponent,
        RouteGraphRouteServiceDialogComponent,
        RouteGraphRouteServicePopupComponent,
        RouteGraphRouteServiceDeleteDialogComponent,
        RouteGraphRouteServiceDeletePopupComponent,
    ],
    providers: [
        RouteGraphRouteServiceService,
        RouteGraphRouteServicePopupService,
        RouteGraphRouteServiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RouteServiceRouteGraphRouteServiceModule {}
