const {expect} = require('@playwright/test')

class PaymentPage
{
    constructor(page)
    {
        this.gmail =  page.locator("label[type='text']")
        this.creditCardNumber = page.locator("div.field input").first()
        this.cvv = page.locator("div.field input").nth(1)
        this.creditCardName = page.locator("div.field input").nth(2)
        this.couponCode = page.locator("div.field input").nth(3)
        this.applyCouponBtn = page.locator("button[type='submit']")
        this.invalidCouponCode = page.locator("p.mt-1")
        this.selectCountry = input[placeholder='Select Country']
        this.countryNames = page.locator(".ta-results")
        this.placeOrder = page.locator(".action__submit")
    }

    async PlaceOrder(userName,creditCardNumber,cvv,creditCardName,couponCode,invalidCouponCode,countryName)
    {
        await expect(this.gmail).toHaveText(userName)
        await this.creditCardNumber.fill(creditCardNumber)
        await this.cvv.fill(cvv)
        await this.creditCardName.fill(creditCardName)
        await this.couponCode.fill(couponCode)
        await this.applyCouponBtn.click()
        await expect(this.invalidCouponCode).toHaveText("* Invalid Coupon")

        await page.locator(this.selectCountry).pressSequentially("ind",{delay: 150})
        const countryDropdown = this.countryNames
        await countryDropdown.first().waitFor()
        //we need to place count() only after locator as count doesn't have autowait mechanism
        const count = await countryDropdown.locator("button").count()
        console.log(count+"- countrycount")
        for(let i=0;i<count;i++)
        {
            const countryName = await countryDropdown.locator("button").nth(i).textContent()
            if(countryName === countryName)
            {
                console.log(countryName)
                await countryDropdown.locator("button").nth(i).click()
                break
            }
        }
        await this.PlaceOrder.click()        
    }
}

module.exports = {PaymentPage}