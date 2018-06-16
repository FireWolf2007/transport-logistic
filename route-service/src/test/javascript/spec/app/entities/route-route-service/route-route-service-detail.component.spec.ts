/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RouteServiceTestModule } from '../../../test.module';
import { RouteRouteServiceDetailComponent } from '../../../../../../main/webapp/app/entities/route-route-service/route-route-service-detail.component';
import { RouteRouteServiceService } from '../../../../../../main/webapp/app/entities/route-route-service/route-route-service.service';
import { RouteRouteService } from '../../../../../../main/webapp/app/entities/route-route-service/route-route-service.model';

describe('Component Tests', () => {

    describe('RouteRouteService Management Detail Component', () => {
        let comp: RouteRouteServiceDetailComponent;
        let fixture: ComponentFixture<RouteRouteServiceDetailComponent>;
        let service: RouteRouteServiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouteServiceTestModule],
                declarations: [RouteRouteServiceDetailComponent],
                providers: [
                    RouteRouteServiceService
                ]
            })
            .overrideTemplate(RouteRouteServiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RouteRouteServiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RouteRouteServiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RouteRouteService(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.route).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
