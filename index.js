const playwright = require('playwright');

// Constants
const URL_1 = 'https://www.united.com/en/us/fsr/choose-flights?f=LAX&t=TYO&d=2024-01-26&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches&tqp=A';
const URL_2 = 'https://www.united.com/en/us/fsr/choose-flights?f=SFO&t=TYO&d=2024-01-26&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches&tqp=A';
const URL_3 = 'https://www.united.com/en/us/fsr/choose-flights?f=SFO&t=LGA&d=2024-01-26&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches&tqp=A';
const localHost = 'http://localhost:8080/';


(async () => {
  const browser = await playwright.firefox.launch({headless: true});
  const page = await browser.newPage();
  console.log("hello")

  // page.on('console', async msg => {
  //   if (msg.type() === 'error' && msg.text().includes('GetFlightError') && page.url().includes('united.com')) {
  //     console.log('Specific console error occurred on United page. Reloading the page...');
  //     await page.reload();
  //   }
  // });
  // try {
  //   await page.goto('https://www.united.com/en/us/fsr/choose-flights?f=LAX&t=TYO&d=2024-01-26&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches&tqp=A');
  // } catch (error) {
  //   console.log('Error occurred while navigating. Reloading the page...');
  //   await page.reload();
  // }
  // await page.waitForSelector('div[class="app-components-Shopping-Miles-styles__fontStyle--U52XW"]');

  // const htmlContent = fs.readFileSync('./temp.html', 'utf8');
  // await page.setContent(htmlContent);

  await page.goto(URL_3);
  // await page.goto('http://localhost:8080/');


  await page.waitForSelector('div[class="app-components-Shopping-Miles-styles__fontStyle--U52XW"]');
  await page.waitForTimeout(5000); // waits for 5 seconds


  const flightRows = await page.$$('div[class="app-components-Shopping-GridItem-styles__flightRow--QbVXL"]');
  const flightInfo = [];
  let i = 1;

  for (const flightRow of flightRows) {
    const info = {};

    const flightInfoBlock = await flightRow.$('div[class="app-components-Shopping-FlightInfoBlock-styles__flightInfo--eNT2p"]');
    info['Departure Time'] = await flightInfoBlock.$eval('div[class="app-components-Shopping-FlightInfoBlock-styles__departTime--cDBWt"] span:nth-child(2)', el => el.textContent);
    info['Arrival Time'] = await flightInfoBlock.$eval('div[class="app-components-Shopping-FlightInfoBlock-styles__arrivalTime--AXo5U"] span:nth-child(2)', el => el.textContent);

    const gridCells = await flightRow.$$('div[role="gridcell"]');
    for (const gridCell of gridCells) {
      const flightClassElement = await gridCell.$('div[class="app-components-Shopping-PriceCard-styles__boxPriceButton--c_An2 app-components-Shopping-PriceCard-styles__webViewOnly--acLeu"]');
      if (flightClassElement) {
        const flightClass = await flightClassElement.$eval('div[class="app-components-Shopping-PriceCard-styles__cabinTitle--ikjUl app-components-Shopping-PriceCard-styles__mobViewOnly--SJl_L"]', el => el.textContent.trim().replace(/\W/g, ''));
        const flightMilesValue = await flightClassElement.$eval('div[class="app-components-Shopping-Miles-styles__fontStyle--U52XW"]', el => el.textContent.trim());
        info[`${flightClass.trim()}`] = flightMilesValue;
      }
    }

    flightInfo.push({[`flightInfo${i}`]: info});
    i++;
  }


  /**
   * Expceted output:
   * {
   *   flightInfo1:{
   *     'Departure Time': '12:00 PM',
   *     'Arrival Time': '12:00 PM',
   *     'Economy': 'value',
   *     'Premium Economy': 'value',
   *     'Business': 'value',
   *     'Taxes & Fees': 'value'
   *   }
   *   flightInfo2:{
   *   ...
   * }
   */

  console.log(flightInfo);


  // await browser.close();
})();
