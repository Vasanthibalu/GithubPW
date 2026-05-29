const {test,expect} = require('@playwright/test')

test('with browser fixture', async ({browser})=>
{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https:google.com/")
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")
})

test('page fixture', async ({page})=>
{
    const userName = page.locator("#username")
    const password = page.locator("#password")
    const signIn = page.locator("#signInBtn")
    const products = page.locator(".card-body a")

    //aborting network calls
    page.route("**/*.css",route=>route.abort())

    //logging all the request, response calls along with their status codes
    page.on('request',request=>console.log(request.url()))
    page.on('response', response=>console.log(response.url(), response.status()))

    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(page.title())
    await userName.fill("rahulshetty")
    await password.fill("Learning@830$3mK2")

    const IncorrectDetails = await page.locator("[style*='none']").textContent()
    await expect(IncorrectDetails).toContain("Incorrect")

    await userName.clear()
    await userName.fill("rahulshettyacademy")
    await password.fill("Learning@830$3mK2") 
    await signIn.click()

    const productName = await products.first().textContent()
    console.log(productName)
    const listOfProducts = await products.allTextContents()
    console.log(listOfProducts)
})

test('RadioButton Checkbox selectDropdown blinking text', async ({page})=>
{
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
     const userName = "rahulshettyacademy"
     await page.locator("input[name='username']").fill(userName)
     await page.locator("input[name='password']").fill("Learning@830$3mK2")
     await page.locator(".radiotextsty").last().click()
     await page.locator("#okayBtn").click()
      await expect(page.locator(".radiotextsty").last()).toBeChecked()
     //or
     console.log(await page.locator(".radiotextsty").last().isChecked)
     const dropdown = await page.locator("select.form-control")
     await dropdown.selectOption("consult")
     await page.locator("#terms").click()
     console.log(page.locator("#terms").isChecked())
     //or
     await expect(page.locator("#terms")).toBeChecked()

     //we don't have tobechecked() fro validationf unchecked checkbox so we use toBeFalsy
     await page.locator("#terms").uncheck()
     expect(await page.locator("#terms").isChecked()).toBeFalsy()
     await page.locator("#signInBtn").click()

     const blinkingText1 = await page.locator(".float-right a").first()
     const blinkingText2 = await page.locator(".float-right a").last()
    await expect(blinkingText1).toHaveAttribute("class","blinkingText")   
     await expect(blinkingText2).toHaveAttribute("class","blinkingText")  
     
})

test('child window handles', async ({browser})=>
{
    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = "rahulshettyacademy"
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const newPageLink = await page.locator(".float-right a").first()
    
    const [newPage1] = await Promise.all([
    context.waitForEvent('page'),    
    newPageLink.click()])

    const splitedText = await newPage1.locator(".red").textContent()
    const updatedUserName = splitedText.split("@")[1].split(".")[0]
    console.log(updatedUserName)

    await page.locator("#username").fill(updatedUserName)
    //inputValue() is used to retrieve the dynamically entered data or user modified/entered/updated data
    console.log(await page.locator("#username").inputValue())
    await expect(updatedUserName).toEqual(userName)
})