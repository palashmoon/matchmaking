import { browser, by, element } from 'protractor';
export class Register {
    navigateTo() {
        return browser.get('/register');
    }
    getNameTextbox() {
        return element(by.name('Name'));
    }
    getEmailTextbox() {
        return element(by.name('email'));
    }

    getPasswordTextbox() {
        return element(by.name('password'));
    }

    getForm() {
        return element(by.css('.login-form'));
    }
    getParagraphText() {
        return element(by.css('.suggest')).getText();
    }
      getSubmitButton() {
        return element(by.css('.mat-raised-button'));
    }
    getErrorMessage() {
        return element(by.className('alert')).getText();
    }
    getLoginLink() {
        return element(by.tagName('a'));
    }
}
