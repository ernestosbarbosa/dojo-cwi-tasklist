import { browser, by, element, ExpectedConditions } from 'protractor';

export class TaskListPage {

  private get title() { return element(by.css('h1')) }

  private get tasks() { return element.all(by.css('.mat-checkbox')) }

  private get add() { return element(by.id('add')) }

  navigateTo() {
    return browser.get(browser.baseUrl)
  }

  waitLoadTasks(){
    return browser.wait(ExpectedConditions.presenceOf(this.tasks.get(0)), 5000)
  }

  getTitleText() {
    return this.title.getText()
  }

  getTasksLength() {
    this.waitLoadTasks();
    return this.tasks.count()
  }

  addTask() {
    return this.add.click()
  }
}