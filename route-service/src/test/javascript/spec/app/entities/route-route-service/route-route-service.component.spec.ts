/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RouteServiceTestModule } from '../../../test.module';
import { RouteRouteServiceComponent } from '../../../../../../main/webapp/app/entities/route-route-service/route-route-service.component';
import { RouteRouteServiceService } from '../../../../../../main/webapp/app/entities/route-route-service/route-route-service.service';
import { RouteRouteService } from '../../../../../../main/webapp/app/entities/route-route-service/route-route-service.model';

describe('Component Tests', () => {

    describe('RouteRouteService Management Component', () => {
        let comp: RouteRouteServiceComponent;
        let fixture: ComponentFixture<RouteRouteServiceComponent>;
        let service: RouteRouteServiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouteServiceTestModule],
                declarations: [RouteRouteServiceComponent],
                providers: [
                    RouteRouteServiceService
                ]
            })
            .overrideTemplate(RouteRouteServiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RouteRouteServiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RouteRouteServiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RouteRouteService(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.routes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
