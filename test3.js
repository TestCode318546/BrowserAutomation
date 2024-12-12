const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized", "--disable-infobars"],
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const pages = await browser.pages();
  const page = pages[0];

  await page.goto(
    "https://showdownspace-rpa-challenge.vercel.app/challenge-hunting-fed83d58/"
  );

  await page.waitForSelector("button.chakra-button.css-jut409", {
    visible: true,
  });
  await page.click("button.chakra-button.css-jut409");

  let values = await page.evaluate(() => {
    const div = document.querySelector("div.css-1bfe2ax");
    const elements = div.querySelectorAll("span.chakra-badge.css-n2903v");
    return Array.from(elements).map((element) => element.textContent.trim());
  });
  console.log(values);

  for (let i = 1; i <= 64; i++) {
    const imgSelector = `#root > div > div > div.chakra-card.css-jv498s > div > div:nth-child(2) > div:nth-child(${i}) > img`;
    const textSelector = "body > div:nth-child(3)";

    await page.hover(imgSelector);
    await page.waitForSelector(textSelector);
    const text = await page.$eval(textSelector, (el) => el.textContent.trim());

    if (values.includes(text)) {
      await page.waitForSelector(imgSelector, { visible: true });
      await page.click(imgSelector);
      values = values.filter((value) => value !== text);

      if (values.length == 0) {
        break;
      }
    }
  }
})();
