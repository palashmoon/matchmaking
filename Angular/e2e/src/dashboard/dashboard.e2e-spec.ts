import { Dashboard } from './dashboard.po';
import { browser, by } from 'protractor';
import { LoginPage } from '../login/login.po';
describe('Dashboard tests', () => {
    let page: Dashboard;
    let loginPage: LoginPage;

    beforeEach(() => {
        page = new Dashboard();
        loginPage = new LoginPage();
    });
    it('when user save some Skill info, it should display on dashboard', () => {
        loginPage.navigateTo();
        loginPage.getEmailTextbox().sendKeys('hukma@gmail.com');
        loginPage.getPasswordTextbox().sendKeys('123456');
        loginPage.getSubmitButton().click();
        page.getPlusButton().click();
        page.getSkillDialog().click();
        page.getSkillTextbox().sendKeys('javascript');
        page.abc().click();
        page.getLevelTextbox().sendKeys('Beginner');
        page.getSaveButton().click();
        browser.sleep(5000);
        page.navigateTo();
        expect(page.getSkillNameText()).toEqual('javascript');
        expect(page.getSkillLevelText()).toEqual('Skill Level: Beginner');
        browser.sleep(2000);
        page.getLogOutButton().click();
        browser.sleep(5000);
    });
});
