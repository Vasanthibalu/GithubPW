const { test, expect, request } = require('@playwright/test')
const { APIUtils } = require('./Utils/APIUtils')
const loginPayLoad = { userEmail: "9876@gmail.com", userPassword: "Vasanthi@123" }

let token
test.beforeAll(async () => {
    const apiContext = await request.newContext(
        {
            ignoreHTTPSErrors: true
        })
    const apiUtils = new APIUtils(apiContext, loginPayLoad)
    token = await  apiUtils.getToken()
})

test('Network Reuqest Inteept calls', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("button[routerlink*='myorders']").click()
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}))
    await page.locator("button:has-text('view')").first().click()
    await page.pause()
    expect(await page.locator(".blink_me").last()).toHaveText("You are not authorize to view this order")

})