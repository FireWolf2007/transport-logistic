/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RouteServiceTestModule } from '../../../test.module';
import { RoutePointRouteServiceComponent } from '../../../../../../main/webapp/app/entities/route-point-route-service/route-point-route-service.component';
import { RoutePointRouteServiceService } from '../../../../../../main/webapp/app/entities/route-point-route-service/route-point-route-service.service';
import { RoutePointRouteService } from '../../../../../../main/webapp/app/entities/route-point-route-service/route-point-route-service.model';

describe('Component Tests', () => {

    describe('RoutePointRouteService Management Component', () => {
        let comp: RoutePointRouteServiceComponent;
        let fixture: ComponentFixture<RoutePointRouteServiceComponent>;
        let service: RoutePointRouteServiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouteServiceTestModule],
                declarations: [RoutePointRouteServiceComponent],
                providers: [
                    RoutePointRouteServiceService
                ]
            })
            .overrideTemplate(RoutePointRouteServiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoutePointRouteServiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoutePointRouteServiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RoutePointRouteService(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.routePoints[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
