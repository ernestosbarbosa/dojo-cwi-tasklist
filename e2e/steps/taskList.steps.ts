import { Given, When, Then } from 'cucumber'
import { expect } from 'chai'
import { TaskListPage } from '../pageObjects/taskList.po';
import { TaskDialogPage } from '../pageObjects/taskDialog.po';

let page: TaskListPage = new TaskListPage();

Given(/^I went to homepage$/, async () => {
    await page.navigateTo();
});

When(/^I wait for load tasks$/, async () => {
    await page.waitLoadTasks();
});

Then(/^should display tasklist page$/, async () => {
    expect(await page.getTitleText()).to.eq('Tasklist');
});

Then(/^should display tasklist$/, async () => {
    expect(await page.getTasksLength()).to.be.greaterThan(0);
});
