import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RoutePointRouteService } from './route-point-route-service.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RoutePointRouteService>;

@Injectable()
export class RoutePointRouteServiceService {

    private resourceUrl =  SERVER_API_URL + 'api/route-points';

    constructor(private http: HttpClient) { }

    create(routePoint: RoutePointRouteService): Observable<EntityResponseType> {
        const copy = this.convert(routePoint);
        return this.http.post<RoutePointRouteService>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(routePoint: RoutePointRouteService): Observable<EntityResponseType> {
        const copy = this.convert(routePoint);
        return this.http.put<RoutePointRouteService>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RoutePointRouteService>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RoutePointRouteService[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoutePointRouteService[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RoutePointRouteService[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RoutePointRouteService = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RoutePointRouteService[]>): HttpResponse<RoutePointRouteService[]> {
        const jsonResponse: RoutePointRouteService[] = res.body;
        const body: RoutePointRouteService[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RoutePointRouteService.
     */
    private convertItemFromServer(routePoint: RoutePointRouteService): RoutePointRouteService {
        const copy: RoutePointRouteService = Object.assign({}, routePoint);
        return copy;
    }

    /**
     * Convert a RoutePointRouteService to a JSON which can be sent to the server.
     */
    private convert(routePoint: RoutePointRouteService): RoutePointRouteService {
        const copy: RoutePointRouteService = Object.assign({}, routePoint);
        return copy;
    }
}
