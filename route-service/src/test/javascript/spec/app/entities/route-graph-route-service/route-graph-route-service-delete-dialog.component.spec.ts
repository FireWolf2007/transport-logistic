/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RouteServiceTestModule } from '../../../test.module';
import { RouteGraphRouteServiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/route-graph-route-service/route-graph-route-service-delete-dialog.component';
import { RouteGraphRouteServiceService } from '../../../../../../main/webapp/app/entities/route-graph-route-service/route-graph-route-service.service';

describe('Component Tests', () => {

    describe('RouteGraphRouteService Management Delete Component', () => {
        let comp: RouteGraphRouteServiceDeleteDialogComponent;
        let fixture: ComponentFixture<RouteGraphRouteServiceDeleteDialogComponent>;
        let service: RouteGraphRouteServiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouteServiceTestModule],
                declarations: [RouteGraphRouteServiceDeleteDialogComponent],
                providers: [
                    RouteGraphRouteServiceService
                ]
            })
            .overrideTemplate(RouteGraphRouteServiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RouteGraphRouteServiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RouteGraphRouteServiceService);
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
