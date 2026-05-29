// @ts-check
const { defineConfig } = require('@playwright/test')

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig ({
  testDir: './tests',
  // 40 seconds for global timeout and 5 seconds for expect or assertion timeout
  timeout: 40*1000,
  expect:
  {
    timeout : 5000,
  }, 
  reporter: 'html',
  projects:[
    {
        name:"safari",
        use: {
            browserName: 'webkit',
            //channel: 'chrome',
            headless: true,
            screenshot:'only-on-failure', //on,off
            trace:'retain-on-failure',//on, off
             } 
    },  

    {
        name:"chrome",
        use: {
            browserName: 'chromium',
            channel: 'chrome',
            headless: true,
            screenshot:'only-on-failure',
            trace:'retain-on-failure',//on, off
            }
    }
]

});

