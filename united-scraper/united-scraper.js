const BaseScraper = require('../core/baseScraper');
const {SELECTORS} = require("./constants");


class UnitedScraper extends BaseScraper {
  constructor(departureAirport, arrivalAirport, departureDate) {
    const url = `https://www.united.com/en/us/fsr/choose-flights?f=${departureAirport}&t=${arrivalAirport}&d=${departureDate}&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches&tqp=A`;
    super(url);
  }

  async scrape() {
    await this.launchBrowser();
    await this.goToPage();

    await this.page.waitForSelector(SELECTORS.AWAIT_FLIGHT_SELECTOR);
    await this.page.waitForTimeout(5000); // waits for 5 seconds


    const flightRows = await this.page.$$(SELECTORS.FLIGHT_ROW);
    const flightInfo = [];
    let i = 1;

    for (const flightRow of flightRows) {
      const info = {};

      const flightInfoBlock = await flightRow.$(SELECTORS.FLIGHT_INFO_BLOCK);
      info['Departure Time'] = await flightInfoBlock.$eval(SELECTORS.DEPARTURE_TIME, el => el.textContent);
      info['Arrival Time'] = await flightInfoBlock.$eval(SELECTORS.ARRIVAL_TIME, el => el.textContent);

      const gridCells = await flightRow.$$(SELECTORS.GRID_CELL);
      for (const gridCell of gridCells) {
        const flightClassGrid = await gridCell.$(SELECTORS.FLIGHT_CLASS_GRID);
        if (flightClassGrid) {
          const flightClass = await flightClassGrid.$eval(SELECTORS.FLIGHT_CLASS_TYPE, el => el.textContent.trim().replace(/\W/g, ''));
          const flightMilesValue = await flightClassGrid.$eval(SELECTORS.AWAIT_FLIGHT_SELECTOR, el => el.textContent.trim());
          info[`${flightClass.trim()}`] = flightMilesValue;
        }
      }

      flightInfo.push({[`flightInfo${i}`]: info});
      i++;
    }

    // TODO: Write to DB

    console.log(flightInfo);




  }
}

module.exports = UnitedScraper;
