/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TimingServiceTestModule } from '../../../test.module';
import { RouteGraphTimingServiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/route-graph-timing-service/route-graph-timing-service-delete-dialog.component';
import { RouteGraphTimingServiceService } from '../../../../../../main/webapp/app/entities/route-graph-timing-service/route-graph-timing-service.service';

describe('Component Tests', () => {

    describe('RouteGraphTimingService Management Delete Component', () => {
        let comp: RouteGraphTimingServiceDeleteDialogComponent;
        let fixture: ComponentFixture<RouteGraphTimingServiceDeleteDialogComponent>;
        let service: RouteGraphTimingServiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TimingServiceTestModule],
                declarations: [RouteGraphTimingServiceDeleteDialogComponent],
                providers: [
                    RouteGraphTimingServiceService
                ]
            })
            .overrideTemplate(RouteGraphTimingServiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RouteGraphTimingServiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RouteGraphTimingServiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
