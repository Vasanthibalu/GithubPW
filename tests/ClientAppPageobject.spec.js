const {test, expect} = require('@playwright/test')
const {LoginPage} = require('../pageobjects/LoginPage')
const {DashboardPage} = require('../pageobjects/DashboardPage')
const {CheckoutPage} = require('../pageobjects/CheckoutPage')
const {PaymentPage} = require('../pageobjects/PaymentPage')

test('Auth login', async ({page})=>
{
    const userName = "9876@gmail.com"
    const password = "Vasanthi@123"
    const productName = "iphone 13 pro"
    const creditCardNumber = "1235 4567 8901 2345"
    const cvv = "233"
    const creditCardName = "Vasanthi G"
    const couponCode = "Bala"
    const invalidCouponCode ="* Invalid Coupon"
    const countryName = " India"

    //for object creation await is not necessaary
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.validLogin(userName,password)
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.searchProductAddtoCart(productName)
    const checkoutPage = new CheckoutPage(page,productName)
    await checkoutPage.ProductCheckout()

    const paymentPage = new PaymentPage(page)
    await paymentPage.PlaceOrder(userName,creditCardNumber,cvv,creditCardName,couponCode,invalidCouponCode,countryName)


        //to have text, tohaveattribute should be used after locator only
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator("label.ng-star-inserted").textContent()
    console.log(orderId)

    await page.locator("button[routerlink*='myorders']").isVisible()
    await page.locator("button[routerlink*='myorders']").click()
    await page.locator(".table-bordered tbody").waitFor();
    const orderRows = await page.locator(".table-bordered tbody tr")
    await page.locator(".table-bordered tbody tr").first().waitFor()

    for(let i=0;i<await orderRows.count();i++)
    {
        const actualOrderId = await orderRows.nth(i).locator("th").textContent()
        await expect(orderId).toContain(actualOrderId)
        if(orderId.includes(actualOrderId))
        {
            console.log(actualOrderId)
            await orderRows.nth(i).locator(".btn-primary").isVisible()
            await orderRows.nth(i).locator(".btn-primary").first().click()
            break
        }
    }
    //await page.pause()
    await expect(page.locator(".email-title")).toHaveText(" order summary ")
    const orderDetails = await page.locator(".-main").textContent()
    await expect(orderId.includes(orderDetails)).toBeTruthy()

})