// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { generate } = require('cucumber-html-reporter');
const { readdirSync, unlinkSync } = require('fs');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 60000,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ["--headless", "--disable-gpu", "--window-size=800,600"]
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    format: 'json:./reports/cucumber_report.json',
    require: [
      './pageObjects/**/*.po.ts',
      './steps/**/*.steps.ts',
      './support/**/*.ts'
    ]
  },
  suites: {
    tests: [
      './features/**/*.feature'
    ]
  },
  onPrepare: () => {
    readdirSync('reports').forEach(function (file) {
      if (file != '.gitkeep')
        unlinkSync(`reports/${file}`);
    });
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
  },
  afterLaunch: () => {
    readdirSync('reports').forEach(function (file) {
      if (file != '.gitkeep') {
        var options = {
          theme: 'bootstrap',
          jsonFile: 'reports/' + file,
          output: 'reports/cucumber_report.html',
          reportSuiteAsScenarios: true,
          launchReport: false,
          name: 'Protractor Automation'
        };
        generate(options);
      }
    });
  }
};