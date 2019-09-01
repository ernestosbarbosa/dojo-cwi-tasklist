import { TaskListPage } from '../pageObjects/taskList.po';
import { TaskDialogPage } from '../pageObjects/taskDialog.po';
import { browser, logging } from 'protractor';

describe('Testing TaskList App', () => {
  let page: TaskListPage;
  let dialog: TaskDialogPage;

  beforeEach(() => {
    page = new TaskListPage();
    dialog = new TaskDialogPage();
    page.navigateTo();
  });

  it('Should display tasklist page', async () => {
    expect(await page.getTitleText()).toEqual('Tasklist');
  });

  it('Display tasks', async () => {
    await page.waitLoadTasks();
    expect(await page.getTasksLength()).toBeGreaterThan(0);
  });

  it('Create task', async () => {
    let tasks = await page.getTasksLength();
    await page.addTask();
    await dialog.taskName("Task Test");
    await dialog.taskHours(10);
    await dialog.taskMinutes(30);
    await dialog.save();

    await browser.sleep(1000);//for update async list

    expect(await page.getTasksLength()).toEqual(tasks + 1);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
