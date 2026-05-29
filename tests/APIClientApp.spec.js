const {test, expect, request} = require('@playwright/test')
const {APIUtils} = require('./Utils/APIUtils')
const loginPayLoad = {userEmail: "9876@gmail.com", userPassword: "Vasanthi@123"}
const createOrderPayload = {orders: [{country: "cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}

let response
test.beforeAll( async ()=>
{
    const apiContext = await request.newContext(
        {
             ignoreHTTPSErrors: true
        }
    ) 
    const apiUtils = new APIUtils(apiContext, loginPayLoad)
    response = await apiUtils.createOrder(createOrderPayload)
})

test.beforeEach( ()=>
    {
        
    }
)
test('@Api Auth login', async ({page})=>
{
    page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value)
    }, response.token)
    await page.goto("https://rahulshettyacademy.com/client")
    await page.reload();
    const productName = "ZARA COAT 3"
    await page.locator("button[routerlink*='myorders']").isVisible()
    await page.locator("button[routerlink*='myorders']").click()
    await page.locator(".table-bordered tbody").waitFor();
    const orderRows = await page.locator(".table-bordered tbody tr")
    await page.locator(".table-bordered tbody tr").first().waitFor()

    for(let i=0;i<await orderRows.count();i++)
    {
        const actualOrderId = await orderRows.nth(i).locator("th").textContent()
        if(response.orderId.includes(actualOrderId))
        {
            console.log(actualOrderId+"--actualorderid")
            await expect(orderRows.nth(i).locator(".btn-primary")).toBeVisible
            await orderRows.nth(i).locator(".btn-primary").first().click()
            break
        }
    }
    await page.pause()
    
})