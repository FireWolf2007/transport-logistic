import { BaseEntity } from './../../shared';

export class RouteGraphTimingService implements BaseEntity {
    constructor(
        public id?: number,
        public pointFirstId?: number,
        public pointSecondId?: number,
        public time?: number,
    ) {
    }
}
