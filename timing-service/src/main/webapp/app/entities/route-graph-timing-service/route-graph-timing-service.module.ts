import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TimingServiceSharedModule } from '../../shared';
import {
    RouteGraphTimingServiceService,
    RouteGraphTimingServicePopupService,
    RouteGraphTimingServiceComponent,
    RouteGraphTimingServiceDetailComponent,
    RouteGraphTimingServiceDialogComponent,
    RouteGraphTimingServicePopupComponent,
    RouteGraphTimingServiceDeletePopupComponent,
    RouteGraphTimingServiceDeleteDialogComponent,
    routeGraphRoute,
    routeGraphPopupRoute,
    RouteGraphTimingServiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...routeGraphRoute,
    ...routeGraphPopupRoute,
];

@NgModule({
    imports: [
        TimingServiceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RouteGraphTimingServiceComponent,
        RouteGraphTimingServiceDetailComponent,
        RouteGraphTimingServiceDialogComponent,
        RouteGraphTimingServiceDeleteDialogComponent,
        RouteGraphTimingServicePopupComponent,
        RouteGraphTimingServiceDeletePopupComponent,
    ],
    entryComponents: [
        RouteGraphTimingServiceComponent,
        RouteGraphTimingServiceDialogComponent,
        RouteGraphTimingServicePopupComponent,
        RouteGraphTimingServiceDeleteDialogComponent,
        RouteGraphTimingServiceDeletePopupComponent,
    ],
    providers: [
        RouteGraphTimingServiceService,
        RouteGraphTimingServicePopupService,
        RouteGraphTimingServiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimingServiceRouteGraphTimingServiceModule {}
