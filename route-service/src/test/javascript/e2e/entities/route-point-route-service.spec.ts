import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('RoutePoint e2e test', () => {

    let navBarPage: NavBarPage;
    let routePointDialogPage: RoutePointDialogPage;
    let routePointComponentsPage: RoutePointComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RoutePoints', () => {
        navBarPage.goToEntity('route-point-route-service');
        routePointComponentsPage = new RoutePointComponentsPage();
        expect(routePointComponentsPage.getTitle())
            .toMatch(/routeServiceApp.routePoint.home.title/);

    });

    it('should load create RoutePoint dialog', () => {
        routePointComponentsPage.clickOnCreateButton();
        routePointDialogPage = new RoutePointDialogPage();
        expect(routePointDialogPage.getModalTitle())
            .toMatch(/routeServiceApp.routePoint.home.createOrEditLabel/);
        routePointDialogPage.close();
    });

   /* it('should create and save RoutePoints', () => {
        routePointComponentsPage.clickOnCreateButton();
        routePointDialogPage.routeSelectLastOption();
        routePointDialogPage.save();
        expect(routePointDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RoutePointComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-route-point-route-service div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RoutePointDialogPage {
    modalTitle = element(by.css('h4#myRoutePointLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    routeSelect = element(by.css('select#field_route'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    routeSelectLastOption = function() {
        this.routeSelect.all(by.tagName('option')).last().click();
    };

    routeSelectOption = function(option) {
        this.routeSelect.sendKeys(option);
    };

    getRouteSelect = function() {
        return this.routeSelect;
    };

    getRouteSelectedOption = function() {
        return this.routeSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
