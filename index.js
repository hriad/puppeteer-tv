const puppeteer = require('puppeteer')

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

async function run () {
    const browser = await puppeteer.launch({
        appMode: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
    })

    const pages = await browser.pages();
    const page = pages[0];
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto('https://www.tradingview.com/chart/?symbol=BITFINEX%3ABTCUSD')
    await page.waitFor('body > div.wizard-tooltip.first.introduction > div.wizard-tooltip-stop')
    await page.click('body > div.wizard-tooltip.first.introduction > div.wizard-tooltip-stop')
    await sleep(50)
    await page.waitFor('body > div.js-rootresizer__contents > div.layout__area--right > div > div.widgetbar-tabs > div > div.scrollWrap-3gtPS0Fe-.noScrollBar-ieMwbfur- > div > div > div.button-3SuA46Ww-.isTab-1dbyVeUX-.isActive-1D4aU96I-.isGrayed-3O5VgbN4-.apply-common-tooltip.common-tooltip-vertical > span > svg')
    await page.click('body > div.js-rootresizer__contents > div.layout__area--right > div > div.widgetbar-tabs > div > div.scrollWrap-3gtPS0Fe-.noScrollBar-ieMwbfur- > div > div > div.button-3SuA46Ww-.isTab-1dbyVeUX-.isActive-1D4aU96I-.isGrayed-3O5VgbN4-.apply-common-tooltip.common-tooltip-vertical > span > svg')
    await sleep(50)
    await page.waitFor('body > div.js-rootresizer__contents > div.layout__area--top > div > div > div:nth-child(1) > div > div.scrollWrap-1icOiezT-.noScrollBar-2zw2auFK- > div > div > div:nth-child(14) > div > span > svg')
    await page.click('body > div.js-rootresizer__contents > div.layout__area--top > div > div > div:nth-child(1) > div > div.scrollWrap-1icOiezT-.noScrollBar-2zw2auFK- > div > div > div:nth-child(14) > div > span > svg')
    await sleep(50)
    await page.evaluate(() => {
        document.querySelector('body > div.tv-exit-fullscreen-button').style['display'] = 'none'
        document.querySelector('body > div.tv-floating-toolbar.tv-trading-toolbar.ui-draggable').style['display'] = 'none'
    })
    await page.screenshot({path: 'screenshot.png'})
    await browser.close()
}

run()