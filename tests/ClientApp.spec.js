const {test, expect} = require('@playwright/test')
const {customtest} = require('../Utils/CustomTestData')
//it is good to convert Json -> String ->JS object
const dataSet = JSON.parse(JSON.stringify(require('../Utils/ClientAppTestData.json')))

for(const data of dataSet)
{
test(`@Web Auth login of ${data.productName}`, async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/auth/login")
    await page.locator("#userEmail").fill(data.userName)
    await page.locator("#userPassword").fill(data.password)
    await page.locator("#login").click()

    //await page.locator(".card-body b").nth(0).textContent();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor()    
    const allProductsNames = await page.locator(".card-body b").allTextContents();
    console.log(allProductsNames)
})
}

customtest(`@Web Auth login of ${data.productName}`, async ({page,testDataForOrder})=>
{
    await page.goto("https://rahulshettyacademy.com/client/auth/login")
    await page.locator("#userEmail").fill(base.userName)
    await page.locator("#userPassword").fill(base.password)
    await page.locator("#login").click()

    //await page.locator(".card-body b").nth(0).textContent();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor()    
    const allProductsNames = await page.locator(".card-body b").allTextContents();
    console.log(allProductsNames)
})

for(const data of dataSet)
{
test(`@Api Auth login1 with ${data.productName}`, async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
     const creditCardNumber = "1235 4567 8901 2345"
     const cvv = "233"
     const creditCardName = "Vasanthi G"
     const couponCode = "Bala"
     const products = await page.locator(".card-body")
    await page.locator("#userEmail").fill(data.userName)
    await page.locator("#userPassword").fill(data.password)
    await page.locator("input[name='login']").click()

    await page.locator(".card-body b").first().waitFor()
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles)
   
    const productCount = await page.locator(".card-body").count()
    console.log(productCount)
    for(let i=0;i<productCount;i++)
    {
        const expectedProductName = await products.nth(i).locator("b").textContent()
        if(await expectedProductName===data.productName)
        {
            await expect(products.nth(i).locator("b")).toHaveText("iphone 13 pro")
            const addToCartBtn = await products.nth(i).locator(".w-10").click()
            break
        }
    }
    
    await page.locator("[routerlink*='cart']").click()
    await expect(page.locator("h3:has-text('iphone 13 pro')")).toHaveText(data.productName)
    await page.locator(".totalRow .btn").click()
    await expect(page.locator("label[type='text']")).toHaveText(userName)

    await page.locator("div.field input").first().fill(creditCardNumber)
    await page.locator("div.field input").nth(1).fill(cvv)
    await page.locator("div.field input").nth(2).fill(creditCardName)
    await page.locator("div.field input").nth(3).fill(couponCode)
    await page.locator("button[type='submit']").click()
    await expect(page.locator("p.mt-1")).toHaveText("* Invalid Coupon")

    await page.locator("input[placeholder='Select Country']").pressSequentially("ind",{delay: 150})
    const countryDropdown = page.locator(".ta-results")
    await countryDropdown.first().waitFor()
    //we need to place count() only after locator
    const count = await countryDropdown.locator("button").count()
    console.log(count+"- countrycount")
    for(let i=0;i<count;i++)
    {
        const countryName = await countryDropdown.locator("button").nth(i).textContent()
        if(await countryName ===" India")
        {
            console.log(countryName)
            await countryDropdown.locator("button").nth(i).click()
            break
        }
    }

    await page.locator(".action__submit").click()
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
}