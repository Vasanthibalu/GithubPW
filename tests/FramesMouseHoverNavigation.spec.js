const {test,expect} = require('@playwright/test')

test('Navigations Mousehover Alerts Frames', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    //visual testing
    await expect(page).toHaveScreenshot('landing.png')
    // await page.goBack()
    // await page.goForward()

    //verify checkbox is visible or not
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    //entire page screenshot is taken
    await page.screenshot({path:"screenshot.png"})

    //partial or only locator screenshot is taken
    await page.locator("#displayed-text").screenshot({path:"partialScreenshot.png"})

    await expect(page.locator("#displayed-text")).toBeHidden()

    //alerts
    page.on('dialog',dialog=>dialog.accept())
    await page.locator("#confirmbtn").click()

    //MouseHover
    await page.locator("#mousehover").hover()

    //Frames
    const framePages = await page.frameLocator("#courses-iframe")
    await framePages.locator("li a[href*='access']:visible").click()
    const text = await framePages.locator("h2[style*='padding-bottom']").textContent()
    const studentsCount = text.split(" ")[1]
    console.log(studentsCount)

})

test("visual testing", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect((await page.screenshot({path:"screenshot1.png"}))).toMatchSnapshot('landing-page.png')
})