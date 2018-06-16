import { BaseEntity } from './../../shared';

export class RouteRouteService implements BaseEntity {
    constructor(
        public id?: number,
        public isReady?: boolean,
        public time?: number,
        public routes?: BaseEntity[],
    ) {
        this.isReady = false;
    }
}
