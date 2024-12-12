const puppeteer = require('puppeteer');
const delay = (ms) => {
    if (ms === 0) {
      return new Promise((resolve) => queueMicrotask(resolve));
    }
    return new Promise((resolve) => setTimeout(resolve, ms));
};

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

    await page.goto('https://showdownspace-rpa-challenge.vercel.app/challenge-mui-168af805/');
    const btStart = `#root > div > div.css-19r9bn8 > button`;
    await page.waitForSelector(btStart);
    await page.click(btStart);

    // get all datetime
    let dateTimes = await page.evaluate(() => {
        const elements = document.querySelectorAll('#root > div > div > div.chakra-card.css-jv498s > div > div.css-1fa2nzz > span');
        return Array.from(elements).map(element => element.textContent.trim());
    });
    console.log(dateTimes);


    const btDate = `#root > div > div > div.chakra-card.css-jv498s > div > div.MuiPickersLayout-root.css-y2my5h > div.MuiPickersLayout-contentWrapper.css-lz05jy > div.MuiTabs-root.MuiPickersLayout-tabs.MuiDateTimePickerTabs-root.css-1mqgwfy > div > div > button:nth-child(1)`;
    const btTime = `#root > div > div > div.chakra-card.css-jv498s > div > div.MuiPickersLayout-root.css-y2my5h > div.MuiPickersLayout-contentWrapper.css-lz05jy > div.MuiTabs-root.MuiPickersLayout-tabs.MuiDateTimePickerTabs-root.css-1mqgwfy > div > div > button:nth-child(2)`;
    const btYear = `#root > div > div > div.chakra-card.css-jv498s > div > div.MuiPickersLayout-root.css-y2my5h > div.MuiPickersLayout-contentWrapper.css-lz05jy > div.MuiDateCalendar-root.css-10dg1z8 > div.MuiPickersCalendarHeader-root.css-x79lsh > div.MuiPickersCalendarHeader-labelContainer.css-16j77m4`;
    const btMonthLeft = `#root > div > div > div.chakra-card.css-jv498s > div > div.MuiPickersLayout-root.css-y2my5h > div.MuiPickersLayout-contentWrapper.css-lz05jy > div.MuiDateCalendar-root.css-10dg1z8 > div.MuiPickersCalendarHeader-root.css-x79lsh > div.MuiPickersArrowSwitcher-root.css-k008qs > button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium.MuiPickersArrowSwitcher-button.MuiPickersArrowSwitcher-previousIconButton.css-11wxb`;
    const btMonthRight = `#root > div > div > div.chakra-card.css-jv498s > div > div.MuiPickersLayout-root.css-y2my5h > div.MuiPickersLayout-contentWrapper.css-lz05jy > div.MuiDateCalendar-root.css-10dg1z8 > div.MuiPickersCalendarHeader-root.css-x79lsh > div.MuiPickersArrowSwitcher-root.css-k008qs > button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-edgeStart.MuiIconButton-sizeMedium.MuiPickersArrowSwitcher-button.MuiPickersArrowSwitcher-nextIconButton.css-1fklenr`;
    const btOK = `#root > div > div > div.chakra-card.css-jv498s > div > div.MuiPickersLayout-root.css-y2my5h > div.MuiDialogActions-root.MuiDialogActions-spacing.MuiPickersLayout-actionBar.css-1vskg8q > button:nth-child(2)`;
    
    for(let loop = 0; loop < dateTimes.length; loop++){
        const year = dateTimes[loop].split(" ")[0].split("-")[0];
        const month = dateTimes[loop].split(" ")[0].split("-")[1];
        const day = dateTimes[loop].split(" ")[0].split("-")[2];
        const hour = parseInt(dateTimes[loop].split(" ")[1].split(":")[0]);
        const minute = parseInt(dateTimes[loop].split(" ")[1].split(":")[1]);

        await page.waitForSelector(btDate);
        await page.click(btDate);
        await page.waitForSelector(btYear);
        await page.click(btYear);

        // select year
        await page.evaluate((year) => {
            const elements = document.querySelectorAll('#root > div > div > div.chakra-card.css-jv498s > div > div.MuiPickersLayout-root.css-y2my5h > div.MuiPickersLayout-contentWrapper.css-lz05jy > div.MuiDateCalendar-root.css-10dg1z8 > div.MuiPickersFadeTransitionGroup-root.MuiDateCalendar-viewTransitionContainer.css-1h73gvd > div > div > div');
            
            for(let loopE = 0; loopE < elements.length; loopE++){
                const button = elements[loopE].querySelector('button');
                if(button.textContent == year){
                    button.click();
                }
            }
        }, year);

        
        let currentMonth = await page.evaluate((btYear) => {
            const element = document.querySelector(`${btYear} > div > div`);
            return element.textContent.trim()
        }, btYear);
        currentMonth = currentMonth.split(" ")[0];
        const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        const indexCurrent = months.indexOf(currentMonth) + 1;
        const indexMonth = parseInt(month);
        const difMonth = indexCurrent - indexMonth;

        // click change month
        let btSelectMonth = "";
        if(difMonth > 0){
            btSelectMonth = btMonthLeft;
        }else if(difMonth < 0){
            btSelectMonth = btMonthRight;
        }
        for(let loopD = 0; loopD < Math.abs(difMonth); loopD++){
            await page.waitForSelector(btSelectMonth);
            await page.click(btSelectMonth);
        }


        // select day
        await delay(500);
        await page.evaluate((day) => {
            const elements = document.querySelectorAll('#root > div > div > div.chakra-card.css-jv498s > div > div.MuiPickersLayout-root.css-y2my5h > div.MuiPickersLayout-contentWrapper.css-lz05jy > div.MuiDateCalendar-root.css-10dg1z8 > div.MuiPickersFadeTransitionGroup-root.MuiDateCalendar-viewTransitionContainer.css-1h73gvd > div > div > div.MuiPickersSlideTransition-root.MuiDayCalendar-slideTransition.css-1xuxf2l > div > div');
            
            for(let loopE = 0; loopE < elements.length; loopE++){
                const buttons = elements[loopE].querySelectorAll('button');

                for(let loopB = 0; loopB < buttons.length; loopB++){
                    if(+buttons[loopB].textContent == +day){
                        buttons[loopB].click();
                    }
                }
            }
        }, day);

        await page.waitForSelector(btTime);
        await page.click(btTime);


        const element = await page.$("#root > div > div > div.chakra-card.css-jv498s > div > div.MuiPickersLayout-root.css-y2my5h > div.MuiPickersLayout-contentWrapper.css-lz05jy > div.MuiTimeClock-root.css-foq3gz > div.MuiClock-root.css-fhpqww > div > div.MuiClock-squareMask.css-8u47nn");
        const dimensions = await page.evaluate(element => {
            const rect = element.getBoundingClientRect();
            return { width: rect.width, height: rect.height, x: rect.x, y: rect.y };
        }, element);
        const centerX = dimensions.x + dimensions.width / 2;
        const centerY = dimensions.y + dimensions.height / 2;
        let radius = (dimensions.width / 2) - 10;
        let radius2 = (dimensions.width / 2) - 60;

        const getPositionHour = async (page, hour) => {
            if(hour >= 1 && hour <= 12){
                radius2 = radius;
            }
            const angle = (hour - 3) * 30 * Math.PI / 180;
            const clickX = centerX + radius2 * Math.cos(angle);
            const clickY = centerY + radius2 * Math.sin(angle);
            await page.mouse.click(clickX, clickY);
        };
        const getPositionMinute = async (page, minute) => {
            const angle = (minute - 15) * 6 * Math.PI / 180;
            const clickX = centerX + radius * Math.cos(angle);
            const clickY = centerY + radius * Math.sin(angle);
            await page.mouse.click(clickX, clickY);
        };

        await getPositionHour(page, hour);
        await getPositionMinute(page, minute);
        await page.waitForSelector(btOK);
        await page.click(btOK);
    }
})();
