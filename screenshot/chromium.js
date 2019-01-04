const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url, width = 500, height = 500, deviceScaleFactor = 1) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });

    const page = await browser.newPage();
    await page.setViewport({
        width, height, deviceScaleFactor,
        isMobile: true,
        hasTouch: true
    })
    await page.goto(url);
    const file = await page.screenshot();
    await browser.close();
    return file;
}

module.exports = { getScreenshot };