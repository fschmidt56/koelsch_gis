import puppeteer from 'puppeteer';

//browser, page
let browser: any;
let page: any;
const url: string = 'http://localhost:3000';
//elements
const infoString: string = '#infoButton';
const drawString: string = '#drawButton';
const modifyString: string = '#modifyButton';
const deleteString: string = '#deleteButton';
const submitString: string = '#submitData';
//labels
const expectedLabels: String[] = ['Name:', 'Kölsch:', 'Preis:'];
const expectedFeatures: String[] = ['Gaffel am Dom', 'Gaffel', '1.8 EUR'];

describe('App...', () => {
    //called before tests start
    beforeAll(async () => {
        browser = await puppeteer.launch({
            defaultViewport: null, 
            headless: false, //browser shows up or not
            slowMo: 50, //speed
            args: [
                '--start-fullscreen'
            ]
        })
        //opens given url in browser
        page = await browser.newPage();
        await page.goto(url);
        //page.setViewport({width: 1000, height: 800}) 
    });

    it('should be titled "React App".', async () => {
        expect(page.title()).resolves.toMatch('React App');
    })

    it('selects and unselects drawButton and classNames are added and removed correctly.', async () => {
        await page.waitFor(500);
        const classNameBeforeClick = await page.evaluate(() => document.querySelector('#drawButton')!.className);
        expect(classNameBeforeClick).toEqual('Button');
        await page.click(drawString);
        const classNameAfterClick = await page.evaluate(() => document.querySelector('#drawButton')!.className);
        expect(classNameAfterClick).toEqual('Button active');
        await page.waitFor(500);
        await page.click(drawString);
    });

    it('clicks info Button and three b and p tags are displayed.', async () => {
        jest.setTimeout(300000);
        await page.waitFor(500);
        await page.mouse.click(737, 503);
        await page.waitFor(1000);
        await page.click(infoString);
        await page.waitFor(1000);
        const bElements = await page.$$('b');
        expect(bElements.length).toEqual(3);
        const pElements = await page.$$('p');
        expect(pElements.length).toEqual(3);
        await page.click(infoString);
    });

    it('clicks info Button and available text equals expected text.', async () => {
        jest.setTimeout(300000);
        await page.waitFor(250);
        await page.mouse.click(640, 487);
        await page.waitFor(500);
        await page.click(infoString);
        await page.waitFor(1000);        
        const getLabels = await page.evaluate(
            () => [...document.querySelectorAll('b')].map(elem => elem.innerText)
        );
        const getFeatures = await page.evaluate(
            () => [...document.querySelectorAll('p')].map(elem => elem.innerText)
        );
        expect(expectedLabels).toEqual(getLabels);
        expect(expectedFeatures).toEqual(getFeatures);
        await page.click(infoString);
    });

    it('zooms in and out.', async () => {
        jest.setTimeout(300000);
        await page.waitFor(500);
        for (let i = 0; i <= 4; i++) {
            await page.click('.ol-zoom-in')
        };
        await page.waitFor(250);
        for (let i = 0; i <= 4; i++) {
            await page.click('.ol-zoom-out')
        };
        await page.waitFor(750);
    });

    it('clicks on given coordinates, opens overlay, enters data to input fields and submits.', async () => {
        jest.setTimeout(300000);
        await page.waitFor(1500);
        await page.click(drawString);
        await page.waitFor(1000);
        await page.mouse.click(1078, 136);
        await page.waitFor(1500);
        await page.focus('#name');
        await page.keyboard.type('Zur alten Ulme', { delay: 5 });
        await page.focus('#bier');
        await page.keyboard.type('Dom', { delay: 5 });
        await page.focus('#preis');
        await page.keyboard.type('1.60', { delay: 5 });
        await page.screenshot({ fullPage: true, path: 'ulme.png' })
        await page.click(submitString);
        await page.waitFor(2000);
        await page.mouse.click(1078, 136);
        await page.waitFor(500);
        await page.click(infoString);
        await page.waitFor(1000);
    });

    it('clicks on given dataPoint, opens overlay, enters new data to input fields and submits changes.', async () => {
        jest.setTimeout(300000);
        await page.waitFor(1000);
        await page.click(modifyString);
        await page.mouse.click(1078, 136);
        await page.waitFor(1500);
        await page.mouse.down();
        await page.mouse.move(1120, 150);
        await page.waitFor(1000);
        await page.mouse.up();
        await page.waitFor(1500);
        const inputName = await page.$('#name');
        await inputName.click({ clickCount: 3 })
        await page.keyboard.type('Istra', { delay: 3 });
        const inputBier = await page.$('#bier');
        await inputBier.click({ clickCount: 3 });
        await page.keyboard.type('Früh', { delay: 3 });
        const inputPreis = await page.$('#preis');
        await inputPreis.click({ clickCount: 3 });
        await page.focus('#preis');
        await page.keyboard.type('1.40', { delay: 3 });
        await page.waitFor(1000);
        await page.click(submitString);
        await page.waitFor(1000);
    });
        
    it('deletes features at given coordinates.', async () => {
        jest.setTimeout(300000);
        await page.waitFor(1000)
        await page.click(deleteString);
        await page.mouse.click(1120, 150);
        await page.waitFor(2000);
    })

    //called after all tests finished
    afterAll(() => {
        browser.close()
    });
    
});
