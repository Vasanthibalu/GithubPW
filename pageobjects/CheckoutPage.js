const {expect} = require('@playwright/test')

class CheckoutPage
{

    constructor(page,productName)
    {
        this.productName = productName
        this.cartProduct = page.locator("h3:has-text(productname)")
        this.checkoutButton = page.locator(".totalRow .btn")
    }

    async ProductCheckout()
    {
            await expect(this.cartProduct).toBeVisible()
            await this.checkoutButton.click()
    }
}
module.exports = {CheckoutPage}