import { BaseEntity } from './../../shared';

export class RoutePointRouteService implements BaseEntity {
    constructor(
        public id?: number,
        public routeId?: number,
    ) {
    }
}
