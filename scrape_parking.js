const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
const fs = require("fs");
const parse2csv = require("json2csv");

puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  var cars = [];
  //for (j = 1; j < 2; j++) {
  const url = `http://parking.procornella.cat:7770`;
  await page.goto(url);
  await page.waitForTimeout(1000);
  let content = await page.content();
  let $ = cheerio.load(content);
  let parkings = [];
  let inps = $(".CMBLOCATIONCSS > option").map(async function () {
    let parkVal = $(this).val();
    let parkName = $(this).text();
    await page.select(`select[name="CMBLOCATION"]`, parkVal);
    await page.waitForTimeout(2500);
    // Reload web content
    content = await page.content();
    let $1 = cheerio.load(content);
    // Select Floor
    let maxFloor = [];
    let inps2 = $1(".CMBFLOORCSS > option").map(function () {
      maxFloor = $1(this).val();
    });
    let parking = {
      valNum: parkVal,
      name: parkName,
      numFloors: maxFloor,
    };
    parkings.push(parking);
  });
  console.log(parkings);
  // await page.select(`select[name="CMBFLOOR"]`, "1");
  // await page.waitForTimeout(500);
  // let inps2 = $("td#G0mg > table > tbody > tr").length;

  browser.close();
}
run();
