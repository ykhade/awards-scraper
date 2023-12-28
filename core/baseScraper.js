const playwright = require('playwright');

/**
 * Class representing a base scraper.
 * @class
 */
class BaseScraper {
  constructor(url) {
    this.url = url;
  }

  /**
   * Launches a browser and initializes a new page.
   * @async
   * @function
   * @name launchBrowser
   * @returns {void}
   */
  launchBrowser = async() => {
    this.browser = await playwright.firefox.launch({headless: false });
    this.page = await this.browser.newPage();
    console.log("Browser Initialized");
  }


  /**
   * Navigate to a specific page.
   * @memberof BaseScraper
   * @throws {Errox`r} If browser is not initialized. Call launchBrowser first.
   * @returns {Promise<void>} Resolves after navigating to the page.
   */
  goToPage = async() => {
    if (!this.page) {
      throw new Error('Browser is not initialized. Call launchBrowser first.');
    }
    await this.page.goto(this.url);
  }

  /**
   * Closes the browser.
   *
   * @async
   * @throws {Error} If browser is not initialized
   * @returns {Promise<void>} A promise that resolves when the browser is closed
   */
  closeBrowser = async() => {
    if (!this.browser) {
      throw new Error('Browser is not initialized. Nothing to close.');
    }
    await this.browser.close();
  }
}

module.exports = BaseScraper;
