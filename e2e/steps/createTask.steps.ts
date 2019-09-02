import { Given, When, Then } from 'cucumber'
import { browser } from 'protractor';
import { expect } from 'chai'
import { TaskListPage } from '../pageObjects/taskList.po';
import { TaskDialogPage } from '../pageObjects/taskDialog.po';

let page: TaskListPage = new TaskListPage();
let dialog: TaskDialogPage = new TaskDialogPage();
let tasks: number;

Given(/^I select add task option$/, async () => {
    tasks = await page.getTasksLength();
    await page.addTask();
});

Given(/^write all field$/, async () => {
    await dialog.taskName("Task Test");
    await dialog.taskHours(10);
    await dialog.taskMinutes(30);
});

When(/^save taks$/, async () => {
    await dialog.save();
});

Then(/^the task is displayed into tasklist$/, async () => {
    await browser.sleep(1000);//for update async list
    expect(await page.getTasksLength()).to.eq(tasks + 1);
});
