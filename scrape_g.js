const fs = require("fs");
const cheerio = require("cheerio");

const $ = cheerio.load(fs.readFileSync("./google_news.html"));

titleG = $("div.tF2Cxc > div:nth-child(1) > a > h3").text();
titleN = $(".JheGif").text();

linkG = $("div.tF2Cxc > div:nth-child(1) > a").text();
linkN = $(".JheGif").text();

snippetG = $("div.tF2Cxc > div:nth-child(2) > div > span").text();
snippetN = $(".Y3v8qd").text();

console.log(snippetN);
