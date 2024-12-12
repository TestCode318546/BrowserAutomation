const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized", "--disable-infobars"],
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const pages = await browser.pages();
  const page = pages[0];

  await page.goto("https://lemon-meadow-0c732f100.5.azurestaticapps.net/");
  
  await page.waitForSelector('input[type="checkbox"]');
  page.on("dialog", async (dialog) => {
    console.log("Alert message:", dialog.message());
    await dialog.accept();
  });

  await page.$$eval('input[type="checkbox"]', (checkboxes) => {
    checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.click();
      }
    });
  });
})();
