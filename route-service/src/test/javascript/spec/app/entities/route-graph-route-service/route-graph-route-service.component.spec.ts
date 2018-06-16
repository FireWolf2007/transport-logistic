/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RouteServiceTestModule } from '../../../test.module';
import { RouteGraphRouteServiceComponent } from '../../../../../../main/webapp/app/entities/route-graph-route-service/route-graph-route-service.component';
import { RouteGraphRouteServiceService } from '../../../../../../main/webapp/app/entities/route-graph-route-service/route-graph-route-service.service';
import { RouteGraphRouteService } from '../../../../../../main/webapp/app/entities/route-graph-route-service/route-graph-route-service.model';

describe('Component Tests', () => {

    describe('RouteGraphRouteService Management Component', () => {
        let comp: RouteGraphRouteServiceComponent;
        let fixture: ComponentFixture<RouteGraphRouteServiceComponent>;
        let service: RouteGraphRouteServiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouteServiceTestModule],
                declarations: [RouteGraphRouteServiceComponent],
                providers: [
                    RouteGraphRouteServiceService
                ]
            })
            .overrideTemplate(RouteGraphRouteServiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RouteGraphRouteServiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RouteGraphRouteServiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RouteGraphRouteService(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.routeGraphs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
