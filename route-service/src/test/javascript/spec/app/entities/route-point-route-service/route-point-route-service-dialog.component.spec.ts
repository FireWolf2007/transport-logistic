/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RouteServiceTestModule } from '../../../test.module';
import { RoutePointRouteServiceDialogComponent } from '../../../../../../main/webapp/app/entities/route-point-route-service/route-point-route-service-dialog.component';
import { RoutePointRouteServiceService } from '../../../../../../main/webapp/app/entities/route-point-route-service/route-point-route-service.service';
import { RoutePointRouteService } from '../../../../../../main/webapp/app/entities/route-point-route-service/route-point-route-service.model';
import { RouteRouteServiceService } from '../../../../../../main/webapp/app/entities/route-route-service';

describe('Component Tests', () => {

    describe('RoutePointRouteService Management Dialog Component', () => {
        let comp: RoutePointRouteServiceDialogComponent;
        let fixture: ComponentFixture<RoutePointRouteServiceDialogComponent>;
        let service: RoutePointRouteServiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouteServiceTestModule],
                declarations: [RoutePointRouteServiceDialogComponent],
                providers: [
                    RouteRouteServiceService,
                    RoutePointRouteServiceService
                ]
            })
            .overrideTemplate(RoutePointRouteServiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoutePointRouteServiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoutePointRouteServiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RoutePointRouteService(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.routePoint = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'routePointListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RoutePointRouteService();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.routePoint = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'routePointListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
