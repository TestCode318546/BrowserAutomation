const puppeteer = require('puppeteer');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--start-maximized',
            '--disable-infobars'
        ],
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' // กำหนด path ของเบราว์เซอร์ที่ติดตั้ง
    });    
    const pages = await browser.pages();
    const page = pages[0]; 

    // เปิด URL
    await page.goto('https://contributor.stock.adobe.com/en/uploads');
    await page.type('#EmailPage-EmailField', 'Anocha_ping@hotmail.com');
    const enterMail = "#EmailForm > section.EmailPage__submit.mod-submit > div.ta-right > button > span";
    await page.waitForSelector(enterMail);
    await page.click(enterMail);
    // await page.keyboard.press('Enter');
    const continueKey = "#App > div > div > section > div > div > section > div.Route > section > div > div > section > section.CardLayout__content > section.Page__actions.mt-xs-4 > button > span";
    await page.waitForSelector(continueKey);
    await page.click(continueKey);
    const passwordKey = "#PasswordPage-PasswordField";
    await page.waitForSelector(passwordKey);
    await page.type(passwordKey, '24339PaPay');
    await delay(2000);
    const continuePassword = "#PasswordForm > section.PasswordPage__action-buttons-wrapper > div:nth-child(2) > button > span";
    await page.waitForSelector(continuePassword);
    await page.click(continuePassword);


    const image = "#app > div > div > div.PageDataHandler__PageDataHandlerWrapper-sc-1xs45x6-0.fhitLe > div > div > div.uploads-page__page-content.container-relative > div.main-container > div.content-new-upload-page__content.padding-top-large > div > div.dropzone > div.content-grid-wrapper > div.content-grid > div:nth-child(1)";
    await page.waitForSelector(image);
    await page.click(image);
    const addAll = "#app > div > div > div.PageDataHandler__PageDataHandlerWrapper-sc-1xs45x6-0.fhitLe > div > div > div.uploads-page__page-content.container-relative > div.main-container > div.content-new-upload-page__content.padding-top-large > div > div.content-side-panel-wrapper.content-side-panel-wrapper--uploads > div.content-side-panel > div > div > div > div > div.padding-left-large.padding-right-large.margin-top-medium > div > div.margin-bottom-medium.clear-fix > div > div.margin-bottom-xsmall.clear-fix.container-full > div > div:nth-child(2) > div.KeywordTagsGroup__TitleWrapper-sc-1ylhuym-1.cNCoag > button";
    await page.waitForSelector(addAll);
    await page.click(addAll);
    const alTool = "#content-tagger-generative-ai-checkbox";
    await page.waitForSelector(alTool);
    await page.click(alTool);
    const alTool2 = "#content-tagger-generative-ai-property-release-checkbox";
    await page.waitForSelector(alTool2);
    await page.click(alTool2);



})();

// document.querySelector("#app > div > div > div.PageDataHandler__PageDataHandlerWrapper-sc-1xs45x6-0.fhitLe > div > div > div.uploads-page__page-content.container-relative > div.main-container > div.content-new-upload-page__content.padding-top-large > div > div.content-side-panel-wrapper.content-side-panel-wrapper--uploads > div.content-side-panel > div > div > div > div > div.padding-left-large.padding-right-large.margin-top-medium > div.mobile-tagger-details.visible > div.margin-bottom-medium.container-relative > div > div > textarea")
// document.querySelector("#app > div > div > div.PageDataHandler__PageDataHandlerWrapper-sc-1xs45x6-0.fhitLe > div > div > div.uploads-page__page-content.container-relative > div.main-container > div.content-new-upload-page__content.padding-top-large > div > div.content-side-panel-wrapper.content-side-panel-wrapper--uploads > div.content-side-panel > div > div > div > div > div.padding-left-large.padding-right-large.margin-top-medium > div.mobile-tagger-details.visible > div.margin-bottom-medium.container-relative > div.menu.dropdown.container-absolute.animated.animated--fast.fade-in > div > ul > li:nth-child(1)")





