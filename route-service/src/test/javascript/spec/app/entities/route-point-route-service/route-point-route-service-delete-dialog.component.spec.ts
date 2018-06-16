/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RouteServiceTestModule } from '../../../test.module';
import { RoutePointRouteServiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/route-point-route-service/route-point-route-service-delete-dialog.component';
import { RoutePointRouteServiceService } from '../../../../../../main/webapp/app/entities/route-point-route-service/route-point-route-service.service';

describe('Component Tests', () => {

    describe('RoutePointRouteService Management Delete Component', () => {
        let comp: RoutePointRouteServiceDeleteDialogComponent;
        let fixture: ComponentFixture<RoutePointRouteServiceDeleteDialogComponent>;
        let service: RoutePointRouteServiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouteServiceTestModule],
                declarations: [RoutePointRouteServiceDeleteDialogComponent],
                providers: [
                    RoutePointRouteServiceService
                ]
            })
            .overrideTemplate(RoutePointRouteServiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoutePointRouteServiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoutePointRouteServiceService);
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
