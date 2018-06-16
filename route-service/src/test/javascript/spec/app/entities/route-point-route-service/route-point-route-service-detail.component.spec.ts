/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RouteServiceTestModule } from '../../../test.module';
import { RoutePointRouteServiceDetailComponent } from '../../../../../../main/webapp/app/entities/route-point-route-service/route-point-route-service-detail.component';
import { RoutePointRouteServiceService } from '../../../../../../main/webapp/app/entities/route-point-route-service/route-point-route-service.service';
import { RoutePointRouteService } from '../../../../../../main/webapp/app/entities/route-point-route-service/route-point-route-service.model';

describe('Component Tests', () => {

    describe('RoutePointRouteService Management Detail Component', () => {
        let comp: RoutePointRouteServiceDetailComponent;
        let fixture: ComponentFixture<RoutePointRouteServiceDetailComponent>;
        let service: RoutePointRouteServiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouteServiceTestModule],
                declarations: [RoutePointRouteServiceDetailComponent],
                providers: [
                    RoutePointRouteServiceService
                ]
            })
            .overrideTemplate(RoutePointRouteServiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoutePointRouteServiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoutePointRouteServiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RoutePointRouteService(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.routePoint).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
