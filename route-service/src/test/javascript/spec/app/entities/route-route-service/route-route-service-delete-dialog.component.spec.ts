/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RouteServiceTestModule } from '../../../test.module';
import { RouteRouteServiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/route-route-service/route-route-service-delete-dialog.component';
import { RouteRouteServiceService } from '../../../../../../main/webapp/app/entities/route-route-service/route-route-service.service';

describe('Component Tests', () => {

    describe('RouteRouteService Management Delete Component', () => {
        let comp: RouteRouteServiceDeleteDialogComponent;
        let fixture: ComponentFixture<RouteRouteServiceDeleteDialogComponent>;
        let service: RouteRouteServiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouteServiceTestModule],
                declarations: [RouteRouteServiceDeleteDialogComponent],
                providers: [
                    RouteRouteServiceService
                ]
            })
            .overrideTemplate(RouteRouteServiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RouteRouteServiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RouteRouteServiceService);
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
