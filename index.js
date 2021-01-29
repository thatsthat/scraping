const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
const fs = require("fs");
const { contains } = require("cheerio");

puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (j = 1; j < 5; j++) {
    let url = `https://www.coches.net/hibrido/segunda-mano/barcelona/?pg=${j}&MaxKms=100000&KeyWords=auris&Fueltype2`;
    await page.goto(url);
    let content = await page.content();
    var $ = cheerio.load(content);
    $(".mt-CardAd-link").each(function (i, element) {
      var a = $(this);
      var model = a.children().eq(0).text().trim();
      var precio = a
        .find("span:contains('contado')")
        .next()
        .text()
        .replace(".", "")
        .replace(" €", "");
      var kms = a
        .find("li:contains('km')")
        .text()
        .trim()
        .replace(" km", "")
        .replace(".", "");
      var year = a.find("li:contains('km')").prev().text().trim();
      console.log(kms);
    });
  }
  browser.close();
}
run();
