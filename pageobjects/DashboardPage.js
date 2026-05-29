const {expect} = require('@playwright/test')

class DashboardPage
{
    constructor(page)
    {
        this.page = page
        this.allProducts = page.locator(".card-body")
        this.productsText = page.locator(".card-body b")
        this.cartButton = page.locator("[routerlink*='cart']")

    }

    async searchProductAddtoCart(productName)
    {
        await this.productsText.first().waitFor() 
        const allProductsNames = await this.productsText.allTextContents();
        console.log(allProductsNames)
        const productCount = await this.allProducts.count()
        console.log(productCount)
        for(let i=0;i<productCount;i++)
        {
            const expectedProductName = await this.allProducts.nth(i).locator("b").textContent()
            if(expectedProductName===productName)
            {
                await expect(this.allProducts.nth(i).locator("b")).toHaveText(productName)
                await this.allProducts.nth(i).locator(".w-10").click()
                break
            }
        }
    }


    async NavigateToCart()
    {
        await this.cartButton.click()
    }


}

module.exports = {DashboardPage}