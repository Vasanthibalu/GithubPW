// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries:1, // will try only once if the test case fails
  //all th retied test cases comes under flaky test tab it means they are not failed but they
  //but they passed after retrying if still failes after retrying then it comes under failed tests cases
  worker:2,//so it will run the spec.js files in //ely

  // 40 seconds for global timeout and 5 seconds for expect or assertion timeout
  timeout: 40*1000,
  expect:
  {
    timeout : 5000,
  }, 
  reporter: 'html',
  use: {

      browserName: 'chromium',
      channel: 'chrome',
      headless: true,
      ignorehttpsErrors:true,
      screenshot:'only-on-failure',
      trace:'retain-on-failure',//on, off
      video:'retain-on-failure',
      ...devices['Galaxy S24'],
      viewreport:{width:720,height:800},

  },

});
module.exports = config;

