const {test, expect} = require('@playwright/test')

test('Angular get by',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByRole("button",{name:'Submit'}).click()
    await page.getByLabel("Student").click()
    await page.getByPlaceholder("Password").fill("Vasanthi G")
    await page.getByText("Success! The Form has been submitted successfully!. ").isVisible()
    await page.getByTitle("ProtoCommerce").isVisible()
    await page.getByRole("link",{name:'Shop'}).click()
    await page.locator(".card-title").filter({hasText:'Nokia Edge'}).getByRole("button").click()
    console.log("hgvy")
})

test('Client app using getby details',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/auth/login")
    const userName = "9876@gmail.com"
    const password = "Vasanthi@123"
    const productName = "iphone 13 pro"
    await page.getByPlaceholder("email@example.com").fill(userName)
    await page.getByPlaceholder("enter your passsword").fill(password)
    await page.getByRole("button",{name:'Login'}).click()

    await page.locator(".card-body").filter({hasText:'iphone 13 pro'}).getByRole("button",{name:' Add To Cart'}).click()

    await page.getByRole("listitem").getByRole("button",{name:"cart"}).click()
    await expect(page.locator("h3:has-text('iphone 13 pro')")).toHaveText(productName)
    await page.getByRole("button",{name:'Checkout'}).click()
    await expect(page.locator(".item__quantity")).toHaveText(" Quantity: 1 ")
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150})
    await page.getByRole("button",{name:' India'}).nth(1).click()

    await page.getByText("Place Order ").click()
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible()
    await page.getByLabel(" | 6a0a88ff965c23b43b226c79 | ")

})