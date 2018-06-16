/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TimingServiceTestModule } from '../../../test.module';
import { RouteGraphTimingServiceComponent } from '../../../../../../main/webapp/app/entities/route-graph-timing-service/route-graph-timing-service.component';
import { RouteGraphTimingServiceService } from '../../../../../../main/webapp/app/entities/route-graph-timing-service/route-graph-timing-service.service';
import { RouteGraphTimingService } from '../../../../../../main/webapp/app/entities/route-graph-timing-service/route-graph-timing-service.model';

describe('Component Tests', () => {

    describe('RouteGraphTimingService Management Component', () => {
        let comp: RouteGraphTimingServiceComponent;
        let fixture: ComponentFixture<RouteGraphTimingServiceComponent>;
        let service: RouteGraphTimingServiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TimingServiceTestModule],
                declarations: [RouteGraphTimingServiceComponent],
                providers: [
                    RouteGraphTimingServiceService
                ]
            })
            .overrideTemplate(RouteGraphTimingServiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RouteGraphTimingServiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RouteGraphTimingServiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RouteGraphTimingService(123)],
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
