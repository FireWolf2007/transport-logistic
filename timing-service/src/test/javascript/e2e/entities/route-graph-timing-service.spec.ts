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
        navBarPage.goToEntity('route-graph-timing-service');
        routeGraphComponentsPage = new RouteGraphComponentsPage();
        expect(routeGraphComponentsPage.getTitle())
            .toMatch(/timingServiceApp.routeGraph.home.title/);

    });

    it('should load create RouteGraph dialog', () => {
        routeGraphComponentsPage.clickOnCreateButton();
        routeGraphDialogPage = new RouteGraphDialogPage();
        expect(routeGraphDialogPage.getModalTitle())
            .toMatch(/timingServiceApp.routeGraph.home.createOrEditLabel/);
        routeGraphDialogPage.close();
    });

    it('should create and save RouteGraphs', () => {
        routeGraphComponentsPage.clickOnCreateButton();
        routeGraphDialogPage.setPointFirstIdInput('5');
        expect(routeGraphDialogPage.getPointFirstIdInput()).toMatch('5');
        routeGraphDialogPage.setPointSecondIdInput('5');
        expect(routeGraphDialogPage.getPointSecondIdInput()).toMatch('5');
        routeGraphDialogPage.setTimeInput('5');
        expect(routeGraphDialogPage.getTimeInput()).toMatch('5');
        routeGraphDialogPage.save();
        expect(routeGraphDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RouteGraphComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-route-graph-timing-service div h2 span')).first();

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
    pointFirstIdInput = element(by.css('input#field_pointFirstId'));
    pointSecondIdInput = element(by.css('input#field_pointSecondId'));
    timeInput = element(by.css('input#field_time'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPointFirstIdInput = function(pointFirstId) {
        this.pointFirstIdInput.sendKeys(pointFirstId);
    };

    getPointFirstIdInput = function() {
        return this.pointFirstIdInput.getAttribute('value');
    };

    setPointSecondIdInput = function(pointSecondId) {
        this.pointSecondIdInput.sendKeys(pointSecondId);
    };

    getPointSecondIdInput = function() {
        return this.pointSecondIdInput.getAttribute('value');
    };

    setTimeInput = function(time) {
        this.timeInput.sendKeys(time);
    };

    getTimeInput = function() {
        return this.timeInput.getAttribute('value');
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
