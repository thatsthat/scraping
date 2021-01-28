const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
const fs = require("fs");
const { contains } = require("cheerio");

const url =
  "https://www.coches.net/hibrido/segunda-mano/barcelona/?pg=2&MaxKms=100000&KeyWords=auris&Fueltype2";
puppeteer.use(StealthPlugin());

async function run() {
  /*
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  let content = await page.content();
  var $ = cheerio.load(content);
  console.log($(".mt-CardAd-link:first").text());
  */

  const $ = cheerio.load(fs.readFileSync("./yeso.html"));
  //console.log($.html());

  $(".mt-CardAd-link").each(function (i, element) {
    var a = $(this);
    var model = a.children().eq(0).text().trim();
    var precio = a.find("span:contains('contado')").next().text();
    var kms = a
      .find("li:contains('km')")
      .text()
      .trim()
      .replace(" km", "")
      .replace(".", "");
    var year = a.find("li:contains('km')").prev().text().trim();
    console.log(kms);
  });

  //browser.close();
  /*
  var rank = a.parent().parent().text();
  var title = a.text();
  var url = a.attr("href");
  var subtext = a.parent().parent().next().children(".subtext").children();
  var points = $(subtext).eq(0).text();
  var username = $(subtext).eq(1).text();
  var comments = $(subtext).eq(2).text();
  $(this).parent().parent().find("td:eq(1)");    
*/
}
run();
