const playwright = require('playwright');

// Breaking Down the United URL
/** example URL https://www.united.com/en/us/fsr/choose-flights?f=SFO&t=LGA&d=2024-01-26&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches&tqp=A
 * f=SFO: This is the departure airport code. In this case, SFO stands for San Francisco International Airport.
 * t=LGA: This is the arrival airport code. LGA stands for LaGuardia Airport in New York.
 * d=2024-01-26: This is the departure date for the flight, formatted as YYYY-MM-DD.
 * tt=1: trip type. The value 1 indicates a one-way trip.
 * at=1: adults traveling.
 * sc=7: ???
 * px=1: Passenger Count? The value 1 indicates one passenger.
 * taxng=1: taxes and fees are included in the price.
 * newHP=True: A flag, indicating the use of a new homepage or layout.
 * clm=7: ???
 * st=bestmatches: This parameter could indicate the sorting order of the search results. In this case, it might be sorted by the best matches.
 * tqp=A: I have no IDEA, it gets appended to the end of the URL no matter what.
 */


// Constants
const URL_1 = 'https://www.united.com/en/us/fsr/choose-flights?f=LAX&t=TYO&d=2024-01-26&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches&tqp=A';
const URL_2 = 'https://www.united.com/en/us/fsr/choose-flights?f=SFO&t=TYO&d=2024-01-26&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches&tqp=A';
const URL_3 = 'https://www.united.com/en/us/fsr/choose-flights?f=SFO&t=LGA&d=2024-01-26&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches&tqp=A';
const localHost = 'http://localhost:8080/';


(async () => {
  const browser = await playwright.firefox.launch({headless: false});
  const page = await browser.newPage();
  console.log("hello")

  await page.goto(URL_3);

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
