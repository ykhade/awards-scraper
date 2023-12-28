// Description: This is the UnitedScraper entry point. It will scrape the United site for the given parameters.
// Description: This is the DeltaScraper entry point. It will scrape the Delta site for the given parameters.
const { airlines } = require('./airlines');
const UnitedScraper = require('./united-scraper/united-scraper');
const DeltaScraper = require('./delta-scraper/delta-scraper');

(async () => {
  //write a timer to time how long it takes to scrape

  // TODO: Make these parameters dynamic
  // TODO: Switch to use different scrapers based on airline
  const departureAirport = "LAX";
  const arrivalAirport = "HND";
  const departureDateUnited = "2024-01-26";
  const departureDateDelta = "2024-02-19T00:00:00";
  for (let airline in airlines){
    console.time(`${airline} Scraping Time`);
    let shouldScrapeAirline = airlines[airline]

    if (shouldScrapeAirline){
      switch(airline){
        case 'united':
          const unitedScraper = new UnitedScraper(departureAirport, arrivalAirport, departureDateUnited);
          await unitedScraper.scrape();
          break;
        case 'delta':
          const deltaScraper = new DeltaScraper(departureAirport, arrivalAirport, departureDateDelta, authToken);
          await deltaScraper.makeRequest();
          break;
          // more cases here...
      }
      console.timeEnd(`${airline} Scraping Time`);
    }
  }
})();

