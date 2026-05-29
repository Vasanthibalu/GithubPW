const {base} = require('@playwright/test')

exports.cusomtest = base.test.extend(
{
    testDataForOrder:
    {
        userName: "9876@gmail.com",
        password: "Vasanthi@123",
        productName: "iphone 13 pro",
    }
})