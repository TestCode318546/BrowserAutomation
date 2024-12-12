// https://github.com/Manoonchai/carpalx-th/blob/main/src/layout.ts
// https://www.w3.org/TR/uievents-code/


const manoonchai_v1 = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["ใ", "ต", "ห", "ล", "ส", "ป", "ั", "ก", "ิ", "บ", "็", "ฬ", "ฯ"],
    ["ง", "เ", "ร", "น", "ม", "อ", "า", "่", "้", "ว", "ื"],
    ["ุ", "ไ", "ท", "ย", "จ", "ค", "ี", "ด", "ะ", "ู"],
    ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"],
    ["ฒ", "ฏ", "ซ", "ญ", "ฟ", "ฉ", "ึ", "ธ", "ฐ", "ฎ", "ฆ", "ฑ", "ฌ"],
    ["ษ", "ถ", "แ", "ช", "พ", "ผ", "ำ", "ข", "โ", "ภ", '"'],
    ["ฤ", "ฝ", "ๆ", "ณ", "๊", "๋", "์", "ศ", "ฮ", "?"],
];

const pattachote = [
    ["ๅ", "/", "_", "ภ", "ถ", "ุ", "ึ", "ค", "ต", "จ", "ข", "ช"],
    ["ๆ", "ไ", "ำ", "พ", "ะ", "ั", "ี", "ร", "น", "ย", "บ", "ล", "ฃ"],
    ["ฟ", "ห", "ก", "ด", "เ", "้", "่", "า", "ส", "ว", "ง"],
    ["ผ", "ป", "แ", "อ", "ิ", "ื", "ท", "ม", "ใ", "ฝ"],
    ["+", "๑", "๒", "๓", "๔", "ู", "฿", "๕", "๖", "๗", "๘", "๙"],
    ["๐", '"', "ฎ", "ฑ", "ธ", "ํ", "๊", "ณ", "ฯ", "ญ", "ฐ", ",", "ฅ"],
    ["ฤ", "ฆ", "ฏ", "โ", "ฌ", "็", "๋", "ษ", "ศ", "ซ", "."],
    ["(", ")", "ฉ", "ฮ", "ฺ", "์", "?", "ฒ", "ฬ", "ฦ"],
];

const keyCodes = [
    ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal"],
    ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"],
    ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote"],
    ["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"],
    ["ShiftLeft", "ShiftRight", "ControlLeft", "ControlRight", "AltLeft", "AltRight", "Space"],
];

  
function getRowAndColumnManoonchai(char) {
    for (let row = 0; row < manoonchai_v1.length; row++) {
        const col = manoonchai_v1[row].indexOf(char);
        if (col !== -1) {
            return { row, col };
        }
    }
    return null;
}
function manoonchaiToNormal(message) {
    let result = "";
    for (let char of message) {
        const position = getRowAndColumnManoonchai(char);
        if (position) {
            result += pattachote[position.row][position.col];
        } else {
            result += char;
        }
    }
    return result;
}

function getRowAndColumnPattachote(char) {
    for (let row = 0; row < pattachote.length; row++) {
        const col = pattachote[row].indexOf(char);
        if (col !== -1) {
            return { row, col };
        }
    }
    return null;
}
async function normalToKeys(page, message) {
    for (let char of message) {
        const position = getRowAndColumnPattachote(char);
        if (position) {
            if(position.row < 4){
                await page.keyboard.press(keyCodes[position.row][position.col]);
            }else{
                await page.keyboard.down('Shift');
                await page.keyboard.press(keyCodes[position.row - 4][position.col]);
                await page.keyboard.up('Shift');
            }
        }
    }
}


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

    await page.goto('https://learn.manoonchai.com/');
    const tbText = `body > main > div.flex.items-center > input`;

    const spanTexts = await page.$$eval(
        "body > main > p.sentence span",
        (spans) => spans.map(span => span.textContent.trim())
    );

    for(let loop = 0; loop < spanTexts.length; loop++){
        await page.waitForSelector(tbText);
        const inputElement = await page.$(tbText);
        await inputElement.focus();
        const text = await page.$eval(tbText, el => el.placeholder );
        
        await normalToKeys(page, manoonchaiToNormal(text));
        await page.keyboard.press("Space");
    }
})();
