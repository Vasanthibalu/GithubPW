class APIUtils
{
    constructor(apiContext,loginPayLoad)
    {
        this.apiContext = apiContext
        this.loginPayLoad = loginPayLoad
    }

    async getToken(apiContext)
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
        }
    )
    const loginResponseJson = await loginResponse.json()
    const token = await loginResponseJson.token
    return token
    }

    async createOrder(createOrderPayload)
    {
        let response = { }
        response.token = await this.getToken()
        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data:createOrderPayload,
                headers:
                {
                    'Authorization': response.token,
                    'Content-Type':'application/json'
                }
            })
            const createOrderJson = await createOrderResponse.json()
            console.log(createOrderJson)
            const orderId = createOrderJson.orders[0]
            response.orderId = orderId
            return response
    }
}

module.exports = {APIUtils};