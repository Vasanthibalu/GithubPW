const {test,expect,request} = require('@playwright/test')
const loginPayload = {email: "45@gmail.com", password: "VasanthiG@02"}
let token

test.beforeAll( async ()=>
{
    const apiContext = await request.newContext(
        {
            ignoreHTTPSErrors:true
        }
    )
    const loginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
            data: loginPayload
        }
    )
    expect(loginResponse.ok()).toBeTruthy()
    const loginResponseJson = await loginResponse.json()
    token = loginResponseJson.token
    console.log(token)
   
})


test('@Api Session 9 Assignment1',async ({page})=>
{
    page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value)
    }, token)
    await page.goto("https://eventhub.rahulshettyacademy.com")
    const eventTitle ="Music Gala2"
    const eventDescription = "Event1 descrip"
    const cityName = "Hyderabad"
    const venue = 'Manikonda'
    const price ="250"
    const totalSeats = "5408"
    const defaultTicketCount ="1"
    const name = "vasanthi G"
    const phoneNumber = "1234567891"
    let seatsBeforeBooking = null
    await page.waitForLoadState('domcontentloaded')
    await expect(page.locator("#nav-events")).toBeVisible()
    //await expect(page.getByRole('link', { name: 'EventHub' })).toBeVisible()

    await page.locator("#nav-events").click()
    await page.locator(".mt-12 button").click()
    await page.locator("#event-title-input").fill(eventTitle)
    await page.locator("#admin-event-form textarea").fill(eventDescription)
    await page.getByLabel("City").fill(cityName)
    await page.getByLabel("Venue").fill(venue)
    await page.getByLabel('Event Date & Time').fill('2026-06-01T14:30');
    await page.getByLabel("Price ($)").fill(price)
    await page.getByLabel("Total Seats").fill(totalSeats)
    await page.getByRole("button",{name:'+ Add Event'}).click()
    await expect(page.locator(".leading-snug")).toHaveText("Event created!")

    //step3
    await page.locator("#nav-events").click()
    await page.locator("[data-testid='event-card']").first().waitFor()

    //one way fill it is incomplete
   /* const seatsBeforeBooking = await totalevents.locator("h3").filter({hasText:eventTitle})
    .totalevents.locator("span.text-emerald-600").textContent()
    //await expect(actualEventName).toHaveText(eventTitle)*/
    
    //another way
    const totalEvents = await page.locator("[data-testid='event-card']")
    for(let i=0;i<await totalEvents.count();i++)
        {
            const actualEventName = await totalEvents.nth(i).locator("h3").textContent()
            if(actualEventName.includes(eventTitle))
            {
                const seatsDetails = await totalEvents.locator("span.text-emerald-600").nth(i).textContent()
                seatsBeforeBooking = seatsDetails.split(" ")[0]
                console.log("Beforeseats --- "+seatsBeforeBooking)
                await totalEvents.locator("#book-now-btn").nth(i).click()
                break
            }
        }

        expect(await page.locator(".space-y-4 .gap-3 span").first()).toHaveText(defaultTicketCount)
        await page.getByLabel("Full Name").fill(name)
        await page.locator("#customer-email").fill(email)
        await page.getByPlaceholder("+91 98765 43210").fill(phoneNumber)
        await page.locator("[type='submit']").click()


        //step6
        const bookingDetails = await page.locator(".py-6")
        await expect(bookingDetails.locator("h3")).toHaveText("Booking Confirmed! 🎉")
        await expect(bookingDetails.locator(".booking-ref")).toBeVisible()
        const bookingRef = await bookingDetails.locator(".booking-ref").textContent()


        //step7
        await bookingDetails.getByRole("button",{name:'View My Bookings'}).click()
        const myBookings = await page.locator(".items-start")
        expect(await page.locator(".items-start").first()).toBeVisible()
        expect(await myBookings.locator("h1")).toHaveText("My Bookings")

        const bookingCards = await page.locator("#booking-card")
        expect(await page.locator("#booking-card").first()).toBeVisible()
        for(let i=0;i<await bookingCards.count();i++)
        {
            const actualBookingRef = await bookingCards.nth(i).locator("span.booking-ref").nth(i).textContent()
            if(actualBookingRef.includes(bookingRef))
            {
                expect(await bookingCards.nth(i).locator("h3").nth(i).textContent()).toHaveText(eventTitle)
                break
            }
        }

    //step 8
    await page.locator("#nav-events").click()
    await page.locator("[data-testid='event-card']").first().waitFor()
    await expect(page.locator("[data-testid='event-card']").first()).toBeVisible()
    const availableSeats = await page.locator("[data-testid='event-card']").filter({hasText:eventTitle})
    .locator("span.text-emerald-600").textContent()
    const seatsAfterBooking = await availableSeats.split(" ")[0]
    console.log(seatsAfterBooking+"  -afterbook")
    await expect(Number(afterSeatsBooking) === Number(seatsBeforeBooking)-1).toBeTruthy()
})      