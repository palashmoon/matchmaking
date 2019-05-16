import { browser, by, element } from 'protractor';
export class Dashboard {
  optionText: 'java';
    navigateTo() {
        return browser.get('/home/user');
    }
    getPageTitleText() {
        return element(by.className('title')).getText();
      }
      getPlusButton() {
        return element(by.className('fab-button'));
      }
      getSkillDialog() {
        return element(by.css('#skill'));
      }
      getSkillTextbox() {
        return element(by.name('skillName'));
      }
      getLevelTextbox() {
        return element(by.name('skillLevel'));
      }
      getSaveButton() {
        return element(by.buttonText('Save'));
      }
      getSkillNameText() {
        return element(by.className('skillname')).getText();
      }
      getSkillLevelText() {
        return element(by.className('skilllevel')).getText();
      }
      abc() {
       return element(by.cssContainingText('.abc', 'javascript'));
      }
      getLogOutButton() {
        return element(by.buttonText('Logout'));
      }
}
