const BaseScraper = require('../core/baseScraper');
const {SELECTORS} = require("./constants");
const {inspect} = require("util");


class UnitedScraper extends BaseScraper {
  constructor(departureAirport, arrivalAirport, departureDate) {
    const url = `https://www.united.com/en/us/fsr/choose-flights?f=${departureAirport}&t=${arrivalAirport}&d=${departureDate}&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches&tqp=A`;
    super(url);
  }
  async scrape () {
  await this.launchBrowser();
  await this.goToPage();

  const responsePromise = this.page.waitForResponse("https://www.united.com/api/flight/FetchFlights");
  const response = await responsePromise;
  const json = await response.json();
  console.log(inspect(json.data, { depth: null, colors: true }));
  }
}

module.exports = UnitedScraper;
