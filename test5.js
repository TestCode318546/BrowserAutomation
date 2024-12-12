const puppeteer = require('puppeteer');

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

    const fs = require('fs');
    const csv = require('csv-parser');
    const dataCSV = [];
    fs.createReadStream('bacblog - Sheet1.csv')
    .pipe(csv())
    .on('data', (data) => dataCSV.push(data))
    .on('end', () => {
        console.log(dataCSV);
    });

    await page.goto('https://dtinth.github.io/bacblog/');

    const dataBlog = [];
    for(let loopPage = 1; loopPage <= 20; loopPage++){
        const pageBacblog = await browser.newPage();
        let links = await page.$$eval('body > main > div > div > ul a', anchors =>
            anchors.map(anchor => ({
                text: anchor.textContent.trim(),
                href: anchor.href
            }))
        );
        console.log(links);

        for(let loop = 1; loop <= links.length; loop++){
            await pageBacblog.goto(links[loop - 1]["href"]);

            const headBlog = "body > main > div > article > header > h1";
            await pageBacblog.waitForSelector(headBlog);
            const textH = await pageBacblog.$eval(headBlog, (element) => element.textContent.trim());

            const pBlog = "body > main > div > article > div > p";
            await pageBacblog.waitForSelector(pBlog);
            const textP = await pageBacblog.$eval(pBlog, (element) => element.textContent.trim());
            const wordCount = textP.split(/\s+/).length;
    
            console.log(`${textH}`);
            console.log(`จำนวนคำทั้งหมด: ${wordCount}`);
            dataBlog.push({ "Article title": textH, "Number of words": wordCount });
        }

        pageBacblog.close();
        if (loopPage != 20){
            const bacblog = `body > main > div > div > div > ul > li:nth-child(3) > a`;
            await page.waitForSelector(bacblog);
            await page.click(bacblog);
        }
    }


    let missing = dataCSV
    .filter(dataCSV => !dataBlog.some(dataBlog => dataBlog['Article title'] === dataCSV['Article title']))
    .map(dataCSV_ => dataCSV_['Article title']);
    console.log(missing);
    
    let duplicates = dataBlog
    .map(data => data['Article title'])
    .filter((title, index, self) => self.indexOf(title) !== index);
    console.log(duplicates); 
    
    let dataNumber = dataBlog.filter(dataBlog => {
        let dataCSV_ = dataCSV.find(dataCSV => dataCSV['Article title'] === dataBlog['Article title']);
        return +dataCSV_['Number of words'] !== +dataBlog['Number of words'];
    })
    .map((dataBlog) => dataBlog['Article title']);
    console.log(dataNumber);


    await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSespJgfjZc0ifw7As_9Y8zYo5UZheLmEPnoGtrJaSqFyy7rNw/viewform');
    await page.waitForNavigation();
    const teamName = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(1) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input";
    await page.waitForSelector(teamName);
    await page.type(teamName, 'Z');

    const question1 = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(2) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input";
    await page.waitForSelector(question1);
    await page.type(question1, missing[0]);

    const question2 = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input";
    await page.waitForSelector(question2);
    await page.type(question2, duplicates[0]);

    const question3 = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(4) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input";
    await page.waitForSelector(question3);
    await page.type(question3, dataNumber[0]);

    const send = `#mG61Hd > div.RH5hzf.RLS9Fe > div > div.ThHDze > div.DE3NNc.CekdCb > div.lRwqcd > div > span > span`;
    await page.waitForSelector(send);
    await page.click(send);
    await page.waitForNavigation();

    const check = `body > div.Uc2NEf > div:nth-child(2) > div.RH5hzf.RLS9Fe > div > div.c2gzEf > div > a > span`;
    await page.waitForSelector(check);
    await page.click(check);
})();