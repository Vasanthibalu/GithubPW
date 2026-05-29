const { test, expect, request } = require('@playwright/test')
const { APIUtils } = require('./Utils/APIUtils')
const loginPayLoad = { userEmail: "9876@gmail.com", userPassword: "Vasanthi@123" }
const createOrderPayload = { orders: [{ country: "cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response
test.beforeAll(async () => {
    const apiContext = await request.newContext(
        {
            ignoreHTTPSErrors: true
        }
    )
    const apiUtils = new APIUtils(apiContext, loginPayLoad)
    response = await apiUtils.createOrder(createOrderPayload)
})

test.beforeEach(() => {

}
)
test('Auth login', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)
    await page.goto("https://rahulshettyacademy.com/client")
    const productName = "ZARA COAT 3"

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            let body = JSON.stringify(fakePayLoadOrders)
            await route.fulfill(
                {
                    response, //we are replacing the actual response with fake payload response
                    body,
                }
            )
        }
    )
    //Netwrok Intercept: API Response->{API Playwright}->Browser->render data on front end  
    await page.locator("button[routerlink*='myorders']").click()
    //no need to put wait here as for me it is working fine
    //await page.waitForResponse(/get-orders-for-customer/)
    console.log(await page.locator(".mt-4").textContent())

})