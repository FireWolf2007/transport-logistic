import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('RouteGraph e2e test', () => {

    let navBarPage: NavBarPage;
    let routeGraphDialogPage: RouteGraphDialogPage;
    let routeGraphComponentsPage: RouteGraphComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RouteGraphs', () => {
        navBarPage.goToEntity('route-graph-route-service');
        routeGraphComponentsPage = new RouteGraphComponentsPage();
        expect(routeGraphComponentsPage.getTitle())
            .toMatch(/routeServiceApp.routeGraph.home.title/);

    });

    it('should load create RouteGraph dialog', () => {
        routeGraphComponentsPage.clickOnCreateButton();
        routeGraphDialogPage = new RouteGraphDialogPage();
        expect(routeGraphDialogPage.getModalTitle())
            .toMatch(/routeServiceApp.routeGraph.home.createOrEditLabel/);
        routeGraphDialogPage.close();
    });

   /* it('should create and save RouteGraphs', () => {
        routeGraphComponentsPage.clickOnCreateButton();
        routeGraphDialogPage.setTimeInput('5');
        expect(routeGraphDialogPage.getTimeInput()).toMatch('5');
        routeGraphDialogPage.pointOneSelectLastOption();
        routeGraphDialogPage.pointTwoSelectLastOption();
        routeGraphDialogPage.save();
        expect(routeGraphDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RouteGraphComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-route-graph-route-service div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RouteGraphDialogPage {
    modalTitle = element(by.css('h4#myRouteGraphLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    timeInput = element(by.css('input#field_time'));
    pointOneSelect = element(by.css('select#field_pointOne'));
    pointTwoSelect = element(by.css('select#field_pointTwo'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTimeInput = function(time) {
        this.timeInput.sendKeys(time);
    };

    getTimeInput = function() {
        return this.timeInput.getAttribute('value');
    };

    pointOneSelectLastOption = function() {
        this.pointOneSelect.all(by.tagName('option')).last().click();
    };

    pointOneSelectOption = function(option) {
        this.pointOneSelect.sendKeys(option);
    };

    getPointOneSelect = function() {
        return this.pointOneSelect;
    };

    getPointOneSelectedOption = function() {
        return this.pointOneSelect.element(by.css('option:checked')).getText();
    };

    pointTwoSelectLastOption = function() {
        this.pointTwoSelect.all(by.tagName('option')).last().click();
    };

    pointTwoSelectOption = function(option) {
        this.pointTwoSelect.sendKeys(option);
    };

    getPointTwoSelect = function() {
        return this.pointTwoSelect;
    };

    getPointTwoSelectedOption = function() {
        return this.pointTwoSelect.element(by.css('option:checked')).getText();
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
