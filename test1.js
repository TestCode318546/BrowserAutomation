const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized", "--disable-infobars"],
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const pages = await browser.pages();
  const page = pages[0];

  await page.goto("https://browser-automation-challenges-demo.netlify.app/");
  await page.waitForSelector("#start-challenge");
  await page.click("#start-challenge");

  await page.waitForSelector("#uuid");
  const uuid = await page.$eval("#uuid", (el) => el.textContent);
  await page.type("#uuid-input", uuid);

  for (let i = 0; i < 5; i++) {
    const checkboxSelector = `#checkbox${i}`;
    await page.waitForSelector(checkboxSelector);
    await page.click(checkboxSelector);
  }

  for (let i = 1; i <= 10; i++) {
    const checkboxSelector = `#click-button`;
    await page.waitForSelector(checkboxSelector);
    await page.click(checkboxSelector);
  }
})();
