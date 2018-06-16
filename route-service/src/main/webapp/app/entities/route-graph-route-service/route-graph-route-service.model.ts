import { BaseEntity } from './../../shared';

export class RouteGraphRouteService implements BaseEntity {
    constructor(
        public id?: number,
        public time?: number,
        public pointFirstId?: number,
        public pointSecondId?: number,
    ) {
    }
}
