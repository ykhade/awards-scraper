// Description: This is the UnitedScraper entry point. It will scrape the United site for the given parameters.
const UnitedScraper = require('./united-scraper/united-scraper');
(async () => {
  // TODO: Make these parameters dynamic
  const departureAirport = 'SFO';
  const arrivalAirport = 'LGA';
  const departureDate = '2024-01-26';

  const unitedScraper = new UnitedScraper(departureAirport, arrivalAirport, departureDate);
  await unitedScraper.scrape();
})();
