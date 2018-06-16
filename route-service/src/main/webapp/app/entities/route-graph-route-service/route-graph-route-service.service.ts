import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RouteGraphRouteService } from './route-graph-route-service.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RouteGraphRouteService>;

@Injectable()
export class RouteGraphRouteServiceService {

    private resourceUrl =  SERVER_API_URL + 'api/route-graphs';

    constructor(private http: HttpClient) { }

    create(routeGraph: RouteGraphRouteService): Observable<EntityResponseType> {
        const copy = this.convert(routeGraph);
        return this.http.post<RouteGraphRouteService>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(routeGraph: RouteGraphRouteService): Observable<EntityResponseType> {
        const copy = this.convert(routeGraph);
        return this.http.put<RouteGraphRouteService>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RouteGraphRouteService>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RouteGraphRouteService[]>> {
        const options = createRequestOption(req);
        return this.http.get<RouteGraphRouteService[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RouteGraphRouteService[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RouteGraphRouteService = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RouteGraphRouteService[]>): HttpResponse<RouteGraphRouteService[]> {
        const jsonResponse: RouteGraphRouteService[] = res.body;
        const body: RouteGraphRouteService[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RouteGraphRouteService.
     */
    private convertItemFromServer(routeGraph: RouteGraphRouteService): RouteGraphRouteService {
        const copy: RouteGraphRouteService = Object.assign({}, routeGraph);
        return copy;
    }

    /**
     * Convert a RouteGraphRouteService to a JSON which can be sent to the server.
     */
    private convert(routeGraph: RouteGraphRouteService): RouteGraphRouteService {
        const copy: RouteGraphRouteService = Object.assign({}, routeGraph);
        return copy;
    }
}
