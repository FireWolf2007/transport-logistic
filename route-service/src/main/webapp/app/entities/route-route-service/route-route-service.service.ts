import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RouteRouteService } from './route-route-service.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RouteRouteService>;

@Injectable()
export class RouteRouteServiceService {

    private resourceUrl =  SERVER_API_URL + 'api/routes';

    constructor(private http: HttpClient) { }

    create(route: RouteRouteService): Observable<EntityResponseType> {
        const copy = this.convert(route);
        return this.http.post<RouteRouteService>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(route: RouteRouteService): Observable<EntityResponseType> {
        const copy = this.convert(route);
        return this.http.put<RouteRouteService>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RouteRouteService>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RouteRouteService[]>> {
        const options = createRequestOption(req);
        return this.http.get<RouteRouteService[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RouteRouteService[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RouteRouteService = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RouteRouteService[]>): HttpResponse<RouteRouteService[]> {
        const jsonResponse: RouteRouteService[] = res.body;
        const body: RouteRouteService[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RouteRouteService.
     */
    private convertItemFromServer(route: RouteRouteService): RouteRouteService {
        const copy: RouteRouteService = Object.assign({}, route);
        return copy;
    }

    /**
     * Convert a RouteRouteService to a JSON which can be sent to the server.
     */
    private convert(route: RouteRouteService): RouteRouteService {
        const copy: RouteRouteService = Object.assign({}, route);
        return copy;
    }
}
