import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RouteGraphTimingService } from './route-graph-timing-service.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RouteGraphTimingService>;

@Injectable()
export class RouteGraphTimingServiceService {

    private resourceUrl =  SERVER_API_URL + 'api/route-graphs';

    constructor(private http: HttpClient) { }

    create(routeGraph: RouteGraphTimingService): Observable<EntityResponseType> {
        const copy = this.convert(routeGraph);
        return this.http.post<RouteGraphTimingService>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(routeGraph: RouteGraphTimingService): Observable<EntityResponseType> {
        const copy = this.convert(routeGraph);
        return this.http.put<RouteGraphTimingService>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RouteGraphTimingService>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RouteGraphTimingService[]>> {
        const options = createRequestOption(req);
        return this.http.get<RouteGraphTimingService[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RouteGraphTimingService[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RouteGraphTimingService = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RouteGraphTimingService[]>): HttpResponse<RouteGraphTimingService[]> {
        const jsonResponse: RouteGraphTimingService[] = res.body;
        const body: RouteGraphTimingService[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RouteGraphTimingService.
     */
    private convertItemFromServer(routeGraph: RouteGraphTimingService): RouteGraphTimingService {
        const copy: RouteGraphTimingService = Object.assign({}, routeGraph);
        return copy;
    }

    /**
     * Convert a RouteGraphTimingService to a JSON which can be sent to the server.
     */
    private convert(routeGraph: RouteGraphTimingService): RouteGraphTimingService {
        const copy: RouteGraphTimingService = Object.assign({}, routeGraph);
        return copy;
    }
}
