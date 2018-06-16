import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RouteServiceRouteRouteServiceModule } from './route-route-service/route-route-service.module';
import { RouteServiceRoutePointRouteServiceModule } from './route-point-route-service/route-point-route-service.module';
import { RouteServiceRouteGraphRouteServiceModule } from './route-graph-route-service/route-graph-route-service.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RouteServiceRouteRouteServiceModule,
        RouteServiceRoutePointRouteServiceModule,
        RouteServiceRouteGraphRouteServiceModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RouteServiceEntityModule {}
