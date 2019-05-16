import { LoginPage } from './login.po';
import { Dashboard } from '../dashboard/dashboard.po';
import { Register } from '../register/register.po';
describe('Login tests', () => {
    let page: LoginPage;
    let dashboard: Dashboard;
    let register: Register;
    beforeEach(() => {
        page = new LoginPage();
        dashboard = new Dashboard();
        register = new Register();
        page.navigateTo();
    });
    it('Login form should be valid', () => {
        page.getEmailTextbox().sendKeys('stackroute@gmail.com');
        page.getPasswordTextbox().sendKeys('1234567');
        let form = page.getForm().getAttribute('class');
        expect(form).toContain('ng-valid');
       });
    it('Login form should be invalid', () => {
        page.getEmailTextbox().sendKeys('abv');
        page.getPasswordTextbox().sendKeys('');

        let form = page.getForm().getAttribute('class');

        expect(form).toContain('ng-invalid');
    });
        it('when user trying to login with not registered mail he should stay on “login” page and see error notification', () => {
        page.getEmailTextbox().sendKeys('stackroute2@gmail.com');
        page.getPasswordTextbox().sendKeys('123456');
        page.getSubmitButton().click();
        expect(page.getErrorMessage()).toEqual('user email not found');
    });
       it('when user trying to login with wrong credentials he should stay on “login” page and see error notification', () => {
        page.getEmailTextbox().sendKeys('stackroute@gmail.com');
        page.getPasswordTextbox().sendKeys('1234567');
        page.getSubmitButton().click();
        expect(page.getErrorMessage()).toEqual('Invalid Login.Please check your email and password');
    });
    it('when user click on register — he should redirect to “registration” page', () => {
        page.getRegisterLink().click();
        expect(register.getParagraphText()).toEqual('Already registered? Login');
     });
    //    it('when login is successful — he should redirect to “dashboard” page', () => {
    //     page.getEmailTextbox().sendKeys('stackroute@gmail.com');
    //     page.getPasswordTextbox().sendKeys('123456');
    //     page.getSubmitButton().click();
    //     expect(dashboard.getPageTitleText()).toEqual('Basic Details');
    // });
});
