import { setDefaultTimeout, Before } from "cucumber";
import { browser } from 'protractor';

setDefaultTimeout(20 * 1000);

Before(() => {
    browser.ignoreSynchronization = true;
})