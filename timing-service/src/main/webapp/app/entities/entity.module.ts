import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TimingServiceRouteGraphTimingServiceModule } from './route-graph-timing-service/route-graph-timing-service.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TimingServiceRouteGraphTimingServiceModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimingServiceEntityModule {}
