/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TimingServiceTestModule } from '../../../test.module';
import { RouteGraphTimingServiceDialogComponent } from '../../../../../../main/webapp/app/entities/route-graph-timing-service/route-graph-timing-service-dialog.component';
import { RouteGraphTimingServiceService } from '../../../../../../main/webapp/app/entities/route-graph-timing-service/route-graph-timing-service.service';
import { RouteGraphTimingService } from '../../../../../../main/webapp/app/entities/route-graph-timing-service/route-graph-timing-service.model';

describe('Component Tests', () => {

    describe('RouteGraphTimingService Management Dialog Component', () => {
        let comp: RouteGraphTimingServiceDialogComponent;
        let fixture: ComponentFixture<RouteGraphTimingServiceDialogComponent>;
        let service: RouteGraphTimingServiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TimingServiceTestModule],
                declarations: [RouteGraphTimingServiceDialogComponent],
                providers: [
                    RouteGraphTimingServiceService
                ]
            })
            .overrideTemplate(RouteGraphTimingServiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RouteGraphTimingServiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RouteGraphTimingServiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RouteGraphTimingService(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.routeGraph = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'routeGraphListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RouteGraphTimingService();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.routeGraph = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'routeGraphListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
