/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RouteServiceTestModule } from '../../../test.module';
import { RouteGraphRouteServiceDialogComponent } from '../../../../../../main/webapp/app/entities/route-graph-route-service/route-graph-route-service-dialog.component';
import { RouteGraphRouteServiceService } from '../../../../../../main/webapp/app/entities/route-graph-route-service/route-graph-route-service.service';
import { RouteGraphRouteService } from '../../../../../../main/webapp/app/entities/route-graph-route-service/route-graph-route-service.model';
import { RoutePointRouteServiceService } from '../../../../../../main/webapp/app/entities/route-point-route-service';

describe('Component Tests', () => {

    describe('RouteGraphRouteService Management Dialog Component', () => {
        let comp: RouteGraphRouteServiceDialogComponent;
        let fixture: ComponentFixture<RouteGraphRouteServiceDialogComponent>;
        let service: RouteGraphRouteServiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouteServiceTestModule],
                declarations: [RouteGraphRouteServiceDialogComponent],
                providers: [
                    RoutePointRouteServiceService,
                    RouteGraphRouteServiceService
                ]
            })
            .overrideTemplate(RouteGraphRouteServiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RouteGraphRouteServiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RouteGraphRouteServiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RouteGraphRouteService(123);
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
                        const entity = new RouteGraphRouteService();
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
