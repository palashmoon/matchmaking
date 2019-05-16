import { Register } from './register.po';
import { browser, by, element } from 'protractor';
import { LoginPage } from '../login/login.po';
describe('Registration tests', () => {
    let page: Register;
    let login: LoginPage;

    beforeEach(() => {
        page = new Register();
        login = new LoginPage();
        page.navigateTo();
    });
    it('Registration form should be valid', () => {
        page.getNameTextbox().sendKeys('stackroute');
        page.getEmailTextbox().sendKeys('info1@stackroute.com');
        page.getPasswordTextbox().sendKeys('1234567');
        let form = page.getForm().getAttribute('class');
        console.log(form);
        expect(form).toContain('ng-valid');
       });
    it('Registration form should be invalid', () => {
        page.getNameTextbox().sendKeys('stackroute');
        page.getEmailTextbox().sendKeys('abv');
        page.getPasswordTextbox().sendKeys('');

        let form = page.getForm().getAttribute('class');

        expect(form).toContain('ng-invalid');
    });
    it('when user trying to register with already registered mail he should stay on “register” page and see error notification', () => {
        page.getNameTextbox().sendKeys('stackroute');
        page.getEmailTextbox().sendKeys('stackroute@gmail.com');
        page.getPasswordTextbox().sendKeys('123456');
        page.getSubmitButton().click();
        expect(page.getErrorMessage()).toEqual('User already exists, Please Login');
    });
    it('when user click on Login — he should redirect to “Login” page', () => {
        page.getLoginLink().click();
        expect(login.getParagraphText()).toEqual('Not on match maker yet? Register');
    });
    it('when registration is successful — he should redirect to “login” page', () => {
            page.getNameTextbox().sendKeys('stackroute');
            page.getEmailTextbox().sendKeys('stackroute5@gmail.com');
            page.getPasswordTextbox().sendKeys('123456');
            page.getSubmitButton().click();
            expect(login.getParagraphText()).toEqual('Not on match maker yet? Register');
        });
});

