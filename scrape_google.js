const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
const fs = require("fs");
const parse2csv = require("json2csv");

puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const url = `http://parking.procornella.cat:7770`;
  await page.goto(url);
  await page.waitForTimeout(1000);
  let content = await page.content();
  let $ = cheerio.load(content);
  // Select Parking 1 and iterate over floors
  await page.select(`select[name="CMBLOCATION"]`, "1");
  await page.waitForTimeout(500);
  for (j = 0; j < 4; j++) {
    await page.select(`select[name="CMBFLOOR"]`, j.toString());
    await page.waitForTimeout(500);
    // reload page content
    content = await page.content();
    $ = cheerio.load(content);
    let resCount1 = $("td#G0mg > table > tbody > tr").length;
  }
  // Select Parking 2 and iterate over floors
  await page.select(`select[name="CMBLOCATION"]`, "5");
  await page.waitForTimeout(500);
  for (j = 0; j < 3; j++) {
    await page.select(`select[name="CMBFLOOR"]`, j.toString());
    await page.waitForTimeout(500);
    // reload page content
    content = await page.content();
    $ = cheerio.load(content);
    let resCount2 = $("td#G0mg > table > tbody > tr").length;
  }
  /*   let parkings = [];
  let inps = $(".CMBLOCATIONCSS > option").map(async function () {
    let parkVal = $(this).val();
    let parkName = $(this).text();
    let parking = {
      name: parkName,
      value: parkVal,
    };
    parkings.push(parking);
  });
  console.log(parkings);
  await page.select(`select[name="CMBFLOOR"]`, "1");
  await page.waitForTimeout(500);
  let inps2 = $("td#G0mg > table > tbody > tr").length; */

  browser.close();
}
run();
