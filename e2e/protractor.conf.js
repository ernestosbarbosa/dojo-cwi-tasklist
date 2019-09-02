// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { JUnitXmlReporter } = require('jasmine-reporters');
/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 60000,
  specs: [
    './test/**/*.spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ["--headless", "--disable-gpu", "--window-size=800,600"]
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(new JUnitXmlReporter({
      savePath: 'reports',
      consolidateAll: false
    }));
  }
};