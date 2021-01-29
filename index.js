const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
const fs = require("fs");
const parse2csv = require("json2csv");

puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // loop over result pages
  var cars = [];
  for (j = 1; j < 5; j++) {
    let url = `https://www.coches.net/hibrido/segunda-mano/barcelona/?pg=${j}&MaxKms=100000&KeyWords=auris&Fueltype2`;
    await page.goto(url);
    let content = await page.content();
    var $ = cheerio.load(content);
    // loop over all cars in the page
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
      var car = {
        km: kms,
        price: precio,
        any: year,
        car: model,
      };
      cars.push(car);
    });
  }
  browser.close();
  // Save results to csv file
  const resFields = Object.keys(cars[0]);
  const opts = { fields: resFields, withBOM: true };
  const resul_csv = parse2csv.parse(cars, opts);
  fs.writeFile("cars.csv", resul_csv, (err) => {
    if (err) throw err;
    console.log("Cars saved!");
  });

  //console.log(cars);
}
run();
