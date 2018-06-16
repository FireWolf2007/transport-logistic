/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RouteServiceTestModule } from '../../../test.module';
import { RouteGraphRouteServiceDetailComponent } from '../../../../../../main/webapp/app/entities/route-graph-route-service/route-graph-route-service-detail.component';
import { RouteGraphRouteServiceService } from '../../../../../../main/webapp/app/entities/route-graph-route-service/route-graph-route-service.service';
import { RouteGraphRouteService } from '../../../../../../main/webapp/app/entities/route-graph-route-service/route-graph-route-service.model';

describe('Component Tests', () => {

    describe('RouteGraphRouteService Management Detail Component', () => {
        let comp: RouteGraphRouteServiceDetailComponent;
        let fixture: ComponentFixture<RouteGraphRouteServiceDetailComponent>;
        let service: RouteGraphRouteServiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouteServiceTestModule],
                declarations: [RouteGraphRouteServiceDetailComponent],
                providers: [
                    RouteGraphRouteServiceService
                ]
            })
            .overrideTemplate(RouteGraphRouteServiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RouteGraphRouteServiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RouteGraphRouteServiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RouteGraphRouteService(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.routeGraph).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
