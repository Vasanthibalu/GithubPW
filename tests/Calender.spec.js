const {test,expect} = require('@playwright/test')

test("@Api Calender",async ({page})=>
{
    const Month = "6"
    const year ="2027"
    const date = "8"
    const expectedList = [Month,date,year]
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__button").last().click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()
    //await page.locator("react-calendar__tile").nth(Number(year)).click
    await page.getByText(year).click()
    await page.locator(".react-calendar__tile").nth(Number(Month)-1).click()
    await page.locator("button[class*='days__day']").nth(date).click()

    //one way
    /*const actualDate = await page.locator(".react-date-picker__inputGroup input").first().getAttribute("value")
    console.log(actualDate)
    const splitedCalenderDate= actualDate.split("-")
    expect(await splitedCalenderDate[0].includes(year)).toBeTruthy()
    expect(await splitedCalenderDate[1].includes(Month)).toBeTruthy()
    expect(await splitedCalenderDate[2].includes(date)).toBeTruthy()*/

    //another way
    const actualDate = await page.locator(".react-date-picker__inputGroup")
    for(let i=0;i<await expectedList.length;i++)
    {
        const date = await actualDate.nth(i).inputValue()
        await expect(date).toEqual(expectedList[i])
    }

})

