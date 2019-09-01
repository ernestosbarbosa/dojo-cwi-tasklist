import { by, element } from 'protractor';

export class TaskDialogPage {

  private get name() { return element(by.id('taskName')) }

  private get hours() { return element(by.id('taskHours')) }

  private get minutes() { return element(by.id('taskMinutes')) }

  private get saveBtn() { return element(by.id('save')) }

  taskName(name:string) {
    return this.name.sendKeys(name)
  }

  taskHours(hours:number) {
    return this.hours.sendKeys(hours)
  }

  taskMinutes(minutes:number) {
    return this.minutes.sendKeys(minutes)
  }

  save() {
    return this.saveBtn.click()
  }

}
