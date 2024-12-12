const PF = require('pathfinding');
const delay = (ms) => {
    if (ms === 0) {
      return new Promise((resolve) => queueMicrotask(resolve));
    }
    return new Promise((resolve) => setTimeout(resolve, ms));
};
const delay_ = 0;

const grid = new PF.Grid([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0]
]);

const finder = new PF.AStarFinder();
const startX = 0, startY = 0;
const endX = 7, endY = 7;
const path = finder.findPath(startX, startY, endX, endY, grid);
console.log('Path:', path);

function displayGrid(grid, path) {
    for (let y = 0; y < grid.height; y++) {
        let row = '';
        for (let x = 0; x < grid.width; x++) {
            if (path.some(p => p[0] === x && p[1] === y)) {
                row += 'X ';
            } else {
                row += grid.nodes[y][x] === 1 ? '# ' : '. ';
            }
        }
        console.log(`${y % 10} ${row}`);
    }
}
displayGrid(grid, path);


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
    await page.goto('https://showdownspace-rpa-challenge.vercel.app/challenge-robot-d34b4b04/');

    const btStart = `#root > div > div.css-19r9bn8 > button`;
    await page.waitForSelector(btStart);
    await page.click(btStart);

    const pTable = `#root > div > div > div.chakra-card.css-jv498s > div > div > table`;
    await page.waitForSelector(pTable);
    const mazeGrid = await page.evaluate((selector) => {
        const table = document.querySelector(selector);
        const rows = table.querySelectorAll("tr");
        const grid = [];

        rows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            const rowArray = [];

            cells.forEach((cell) => {
                const bgColor = getComputedStyle(cell).backgroundColor;
                rowArray.push(bgColor === "rgb(255, 255, 255)" ? 0 : 1);
            });

            grid.push(rowArray);
        });

        return grid;
    }, pTable);


    const grid = new PF.Grid(mazeGrid);
    const finder = new PF.AStarFinder();
    let startX = 0, startY = 0;
    let endX = 0, endY = 0;
    for (let loop = 0; loop < mazeGrid[0].length - 1; loop++) {
        if (mazeGrid[0][loop] === 0) {
            startX = loop;
            startY = 0;
        }
    }
    for (let loop = 0; loop < mazeGrid.length - 1; loop++) {
        if (mazeGrid[loop][0] === 0) {
            startX = 0;
            startY = loop;
        }
    }

    for (let loop = 1; loop < mazeGrid[mazeGrid.length - 1].length; loop++) {
        if (mazeGrid[mazeGrid.length - 1][loop] === 0) {
            endX = loop;
            endY = mazeGrid.length - 1;
        }
    }
    for (let loop = 1; loop < mazeGrid.length; loop++) {
        if (mazeGrid[loop][mazeGrid[0].length - 1] === 0) {
            endX = mazeGrid[0].length - 1;
            endY = loop;
        }
    }

    const path = finder.findPath(startX, startY, endX, endY, grid);
    displayGrid(grid, path);



    const btGo = `#wallInFront`;
    const btLeft = `#root > div > div > div.chakra-card.css-jv498s > div > div > div.css-1fpbagy > button:nth-child(1)`;
    const btRight = `#root > div > div > div.chakra-card.css-jv498s > div > div > div.css-1fpbagy > button:nth-child(2)`;
    // y++ down
    // y-- up
    // x++ right
    // x-- left
    // direction up = 1
    //           right = 2
    //           down = 3
    //           left = 4
    let currentDirection = 3;
    for (let loop = 0; loop < path.length - 1; loop++) {
        let x = path[loop + 1][0] - path[loop][0];
        let y = path[loop + 1][1] - path[loop][1];

        let newDirection = 0;
        if(x == 0 && y == 1){ // y++
            newDirection = currentDirection - 3;
            currentDirection = 3;
        }else if(x == 0 && y == -1){ // y--
            newDirection = currentDirection - 1;
            currentDirection = 1;
        }else if(x == 1 && y == 0){ // x++
            newDirection = currentDirection - 2;
            currentDirection = 2;
        }else{ // x--
            newDirection = currentDirection - 4;
            currentDirection = 4;
        }

        if(newDirection == -1){
            await page.waitForSelector(btRight);
            await page.click(btRight);
        }else if(newDirection == 1){
            await page.waitForSelector(btLeft);
            await page.click(btLeft);
        }else if(newDirection == -2 || newDirection == 2){
            await page.waitForSelector(btLeft);
            await page.click(btLeft);
            await page.waitForSelector(btLeft);
            await page.click(btLeft);
        }else if(newDirection == -3){
            await page.waitForSelector(btLeft);
            await page.click(btLeft);
        }else if(newDirection == 3){
            await page.waitForSelector(btRight);
            await page.click(btRight);
        }

        await page.waitForSelector(btGo);
        await page.click(btGo);
        await delay(delay_);
    }
})();
