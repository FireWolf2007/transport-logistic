/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TimingServiceTestModule } from '../../../test.module';
import { RouteGraphTimingServiceDetailComponent } from '../../../../../../main/webapp/app/entities/route-graph-timing-service/route-graph-timing-service-detail.component';
import { RouteGraphTimingServiceService } from '../../../../../../main/webapp/app/entities/route-graph-timing-service/route-graph-timing-service.service';
import { RouteGraphTimingService } from '../../../../../../main/webapp/app/entities/route-graph-timing-service/route-graph-timing-service.model';

describe('Component Tests', () => {

    describe('RouteGraphTimingService Management Detail Component', () => {
        let comp: RouteGraphTimingServiceDetailComponent;
        let fixture: ComponentFixture<RouteGraphTimingServiceDetailComponent>;
        let service: RouteGraphTimingServiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TimingServiceTestModule],
                declarations: [RouteGraphTimingServiceDetailComponent],
                providers: [
                    RouteGraphTimingServiceService
                ]
            })
            .overrideTemplate(RouteGraphTimingServiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RouteGraphTimingServiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RouteGraphTimingServiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RouteGraphTimingService(123)
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
