const Exceljs = require('exceljs');
const {test,expect} = require('@playwright/test')

async function excelTest(searchText,replaceText,updateCol,filePath)
{
    const workbook = new Exceljs.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet("Sheet1")  
    const output = await readExcel(worksheet,searchText)  

    const cell = await worksheet.getCell(output.row,output.column+updateCol.columnChange)
    cell.value =replaceText
    await workbook.xlsx.writeFile(filePath)
}

 async function readExcel(worksheet,searchText)
{
        let output = {row:-1,column:-1}
        worksheet.eachRow((row,rowNumber) =>
    {
        row.eachCell((cell,colNumber)=>
        {
            console.log(cell.value)
            if(cell.value === searchText)
            {
                output.row = rowNumber
                output.column = colNumber
            }
        })
    })
    return output
}

test('upload and download excel data', async ({page})=>
{
    const searchName = "Mango"
    const updateValue = "450"
    await page.goto("https://rahulshettyacademy.com/upload-download-test/")
    const downloadPromise = page.waitForEvent('download')
    await page.locator("#downloadButton").click()
    const download = await downloadPromise
    
    // we can use below path which is not a ahrdcoded one
    //const filePath = "C:/Users/" + require('os').userInfo().username + "/Downloads/" + download.suggestedFilename();
    //await download.saveAs(filePath)
    const filePath = "C:/Users/X022252/Downloads/download.xlsx"; //it is hardcoding the path so use above

    //update Mango price from 299 to 350
    await excelTest(searchName,updateValue, {rowChange:0,columnChange:2}, filePath)
    await page.locator("#fileinput").click()
    await page.locator("#fileinput").setInputFiles(filePath)

    const desirededRow = page.locator(".rdt_TableRow").filter({hasText: searchName})
    await expect(desirededRow.locator("#cell-4-undefined")).toContainText(updateValue)

})

