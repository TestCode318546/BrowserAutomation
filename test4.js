const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized", "--disable-infobars"],
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const pages = await browser.pages();
  const page = pages[0];

  await page.goto("https://lemon-meadow-0c732f100.5.azurestaticapps.net/ssg");
  
  await page.waitForSelector(".number.svelte-pqiwpi");
  const numberText = await page.$eval(
    ".number.svelte-pqiwpi",
    (el) => el.textContent
  );
  const numberArray = numberText.split("");
  console.log("Array:", numberArray);

  await page.waitForSelector("#app > main > div.game-container.svelte-pqiwpi");
  for (let loop = 1; loop <= numberArray.length; loop++) {
    await ClickSegment(page, loop, numberArray[loop - 1]);
  }
})();

async function ClickSegment(page, index, segment) {
  const segment1 = `#app > main > div.game-container.svelte-pqiwpi > div.display-wrapper.svelte-pqiwpi > div > div > div:nth-child(${index}) > div:nth-child(1)`;
  const segment2 = `#app > main > div.game-container.svelte-pqiwpi > div.display-wrapper.svelte-pqiwpi > div > div > div:nth-child(${index}) > div.segment.vertical.left-top.svelte-jineh9`;
  const segment3 = `#app > main > div.game-container.svelte-pqiwpi > div.display-wrapper.svelte-pqiwpi > div > div > div:nth-child(${index}) > div.segment.vertical.right-top.svelte-jineh9`;
  const segment4 = `#app > main > div.game-container.svelte-pqiwpi > div.display-wrapper.svelte-pqiwpi > div > div > div:nth-child(${index}) > div.segment.horizontal.middle.svelte-jineh9`;
  const segment5 = `#app > main > div.game-container.svelte-pqiwpi > div.display-wrapper.svelte-pqiwpi > div > div > div:nth-child(${index}) > div.segment.vertical.left-bottom.svelte-jineh9`;
  const segment6 = `#app > main > div.game-container.svelte-pqiwpi > div.display-wrapper.svelte-pqiwpi > div > div > div:nth-child(${index}) > div.segment.vertical.right-bottom.svelte-jineh9`;
  const segment7 = `#app > main > div.game-container.svelte-pqiwpi > div.display-wrapper.svelte-pqiwpi > div > div > div:nth-child(${index}) > div.segment.horizontal.bottom.svelte-jineh9`;
  try {
    switch (segment) {
      case "1":
        await page.waitForSelector(segment3);
        await page.click(segment3);
        await page.waitForSelector(segment6);
        await page.click(segment6);
        break;
      case "2":
        await page.waitForSelector(segment1);
        await page.click(segment1);
        await page.waitForSelector(segment3);
        await page.click(segment3);
        await page.waitForSelector(segment4);
        await page.click(segment4);
        await page.waitForSelector(segment5);
        await page.click(segment5);
        await page.waitForSelector(segment7);
        await page.click(segment7);
        break;
      case "3":
        await page.waitForSelector(segment1);
        await page.click(segment1);
        await page.waitForSelector(segment3);
        await page.click(segment3);
        await page.waitForSelector(segment4);
        await page.click(segment4);
        await page.waitForSelector(segment6);
        await page.click(segment6);
        await page.waitForSelector(segment7);
        await page.click(segment7);
        break;
      case "4":
        await page.waitForSelector(segment2);
        await page.click(segment2);
        await page.waitForSelector(segment3);
        await page.click(segment3);
        await page.waitForSelector(segment4);
        await page.click(segment4);
        await page.waitForSelector(segment6);
        await page.click(segment6);
        break;
      case "5":
        await page.waitForSelector(segment1);
        await page.click(segment1);
        await page.waitForSelector(segment2);
        await page.click(segment2);
        await page.waitForSelector(segment4);
        await page.click(segment4);
        await page.waitForSelector(segment6);
        await page.click(segment6);
        await page.waitForSelector(segment7);
        await page.click(segment7);
        break;
      case "6":
        await page.waitForSelector(segment1);
        await page.click(segment1);
        await page.waitForSelector(segment2);
        await page.click(segment2);
        await page.waitForSelector(segment4);
        await page.click(segment4);
        await page.waitForSelector(segment5);
        await page.click(segment5);
        await page.waitForSelector(segment6);
        await page.click(segment6);
        await page.waitForSelector(segment7);
        await page.click(segment7);
        break;
      case "7":
        await page.waitForSelector(segment1);
        await page.click(segment1);
        await page.waitForSelector(segment3);
        await page.click(segment3);
        await page.waitForSelector(segment6);
        await page.click(segment6);
        break;
      case "8":
        await page.waitForSelector(segment1);
        await page.click(segment1);
        await page.waitForSelector(segment2);
        await page.click(segment2);
        await page.waitForSelector(segment3);
        await page.click(segment3);
        await page.waitForSelector(segment4);
        await page.click(segment4);
        await page.waitForSelector(segment5);
        await page.click(segment5);
        await page.waitForSelector(segment6);
        await page.click(segment6);
        await page.waitForSelector(segment7);
        await page.click(segment7);
        break;
      case "9":
        await page.waitForSelector(segment1);
        await page.click(segment1);
        await page.waitForSelector(segment2);
        await page.click(segment2);
        await page.waitForSelector(segment3);
        await page.click(segment3);
        await page.waitForSelector(segment4);
        await page.click(segment4);
        await page.waitForSelector(segment6);
        await page.click(segment6);
        await page.waitForSelector(segment7);
        await page.click(segment7);
        break;
      case "0":
        await page.waitForSelector(segment1);
        await page.click(segment1);
        await page.waitForSelector(segment2);
        await page.click(segment2);
        await page.waitForSelector(segment3);
        await page.click(segment3);
        await page.waitForSelector(segment5);
        await page.click(segment5);
        await page.waitForSelector(segment6);
        await page.click(segment6);
        await page.waitForSelector(segment7);
        await page.click(segment7);
        break;
    }
    console.log(`Clicked: ${segment}`);
  } catch (error) {
    console.error(`Failed to click: ${segment}`, error);
  }
}
