const puppeteer = require('puppeteer');
const delay = (ms) => {
    if (ms === 0) {
      return new Promise((resolve) => queueMicrotask(resolve));
    }
    return new Promise((resolve) => setTimeout(resolve, ms));
};
const delay_ = 100;

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--start-maximized',
            '--disable-infobars'
        ],
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    });    
    const pages = await browser.pages();
    const page = pages[0]; 

    await page.goto('https://showdownspace-rpa-challenge.vercel.app/challenge-towers-6d3a20be/');
    const btStart = `#root > div > div.css-19r9bn8 > button`;
    await page.waitForSelector(btStart);
    await page.click(btStart);

    let numbers = [];
    const divCount = await page.evaluate(() => {
        const divs = document.querySelectorAll("#root > div > div > div.chakra-card.css-jv498s > div > div > div");
        return divs.length;
    });
    for(let loop = 1; loop <= divCount; loop++){
        let number = await page.$eval(`#root > div > div > div.chakra-card.css-jv498s > div > div > div:nth-child(${loop})`, el => el.textContent);
        numbers.push(parseInt(number));
    }

    for(let loop = 0; loop < divCount; loop++){
        let start = loop;
        let end = divCount;
        let subArray = numbers.slice(start, end + 1);
        let maxIndex = subArray.indexOf(Math.max(...subArray));
        let maxValue = subArray[maxIndex];
        numbers.splice(maxIndex + loop, 1);
        numbers.unshift(maxValue);  

        if(maxIndex + loop + 1 == 1){
            continue;
        }
        const tvSource = `#root > div > div > div.chakra-card.css-jv498s > div > div > div:nth-child(${maxIndex + loop + 1})`;
        const tvTarget = `#root > div > div > div.chakra-card.css-jv498s > div > div > div:nth-child(${1})`;
        await page.waitForSelector(tvSource);
        await page.waitForSelector(tvTarget);

        await page.evaluate((tvSource, tvTarget) => {
            const sourceElement = document.querySelector(tvSource);
            const targetElement = document.querySelector(tvTarget);
            const dragStartEvent = new MouseEvent("dragstart", {
                bubbles: true,
                cancelable: true,
            });
            const dragOverEvent = new MouseEvent("dragover", {
                bubbles: true,
                cancelable: true,
            });
            const dropEvent = new MouseEvent("drop", {
                bubbles: true,
                cancelable: true,
            });
            sourceElement.dispatchEvent(dragStartEvent);
            targetElement.dispatchEvent(dragOverEvent);
            targetElement.dispatchEvent(dropEvent);
        }, tvSource, tvTarget);    
        await delay(delay_);    
    }
})();
