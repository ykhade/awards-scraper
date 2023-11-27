/**
 * These constants are used in the united-scraper.js file. Specific elements to select html class components.
 * @type {{AWAIT_FLIGHT_SELECTOR: string, ARRIVAL_TIME: string, FLIGHT_ROW: string, DEPARTURE_TIME: string, FLIGHT_CLASS_TYPE: string, FLIGHT_INFO_BLOCK: string, FLIGHT_CLASS_GRID: string, GRID_CELL: string}}
 */
const SELECTORS = {
  AWAIT_FLIGHT_SELECTOR: 'div[class="app-components-Shopping-Miles-styles__fontStyle--U52XW"]',
  FLIGHT_ROW: 'div[class="app-components-Shopping-GridItem-styles__flightRow--QbVXL"]',
  FLIGHT_INFO_BLOCK: 'div[class="app-components-Shopping-FlightInfoBlock-styles__flightInfo--eNT2p"]',
  DEPARTURE_TIME:'div[class="app-components-Shopping-FlightInfoBlock-styles__departTime--cDBWt"] span:nth-child(2)',
  ARRIVAL_TIME:'div[class="app-components-Shopping-FlightInfoBlock-styles__arrivalTime--AXo5U"] span:nth-child(2)',
  GRID_CELL: 'div[role="gridcell"]',
  FLIGHT_CLASS_GRID: 'div[class="app-components-Shopping-PriceCard-styles__boxPriceButton--c_An2 app-components-Shopping-PriceCard-styles__webViewOnly--acLeu"]',
  FLIGHT_CLASS_TYPE: 'div[class="app-components-Shopping-PriceCard-styles__cabinTitle--ikjUl app-components-Shopping-PriceCard-styles__mobViewOnly--SJl_L"]',
}

module.exports = {
  SELECTORS
}
