const { test, expect } = require('@playwright/test')

let webContext

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("9876@gmail.com")
    await page.locator("#userPassword").fill("Vasanthi@123")
    await page.locator("input[name='login']").click()
    await page.locator(".card-body b").first().waitFor()
    await context.storageState({ path: 'state.json' })
    webContext = await browser.newContext({ storageState: 'state.json' })
}
)

test('Web Auth login using .json login data', async () => {
    const productName = "ZARA COAT 3"
    const page = await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    // await page.reload();
    await page.locator(".card-body b").first().waitFor()
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles)

    await page.locator("button[routerlink*='myorders']").isVisible()
    await page.locator("button[routerlink*='myorders']").click()
    await page.locator(".table-bordered tbody").waitFor();
    const orderRows = await page.locator(".table-bordered tbody tr")
    await page.locator(".table-bordered tbody tr").first().waitFor()

    await page.pause()

})