import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Route e2e test', () => {

    let navBarPage: NavBarPage;
    let routeDialogPage: RouteDialogPage;
    let routeComponentsPage: RouteComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Routes', () => {
        navBarPage.goToEntity('route-route-service');
        routeComponentsPage = new RouteComponentsPage();
        expect(routeComponentsPage.getTitle())
            .toMatch(/routeServiceApp.route.home.title/);

    });

    it('should load create Route dialog', () => {
        routeComponentsPage.clickOnCreateButton();
        routeDialogPage = new RouteDialogPage();
        expect(routeDialogPage.getModalTitle())
            .toMatch(/routeServiceApp.route.home.createOrEditLabel/);
        routeDialogPage.close();
    });

    it('should create and save Routes', () => {
        routeComponentsPage.clickOnCreateButton();
        routeDialogPage.getIsReadyInput().isSelected().then((selected) => {
            if (selected) {
                routeDialogPage.getIsReadyInput().click();
                expect(routeDialogPage.getIsReadyInput().isSelected()).toBeFalsy();
            } else {
                routeDialogPage.getIsReadyInput().click();
                expect(routeDialogPage.getIsReadyInput().isSelected()).toBeTruthy();
            }
        });
        routeDialogPage.setTimeInput('5');
        expect(routeDialogPage.getTimeInput()).toMatch('5');
        routeDialogPage.save();
        expect(routeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RouteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-route-route-service div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RouteDialogPage {
    modalTitle = element(by.css('h4#myRouteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    isReadyInput = element(by.css('input#field_isReady'));
    timeInput = element(by.css('input#field_time'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    getIsReadyInput = function() {
        return this.isReadyInput;
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
