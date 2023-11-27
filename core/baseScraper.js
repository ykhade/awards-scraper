const playwright = require('playwright');

class BaseScraper {
  constructor(url) {
    this.url = url;
  }

  async launchBrowser() {
    this.browser = await playwright.firefox.launch({headless: false});
    this.page = await this.browser.newPage();
    console.log("Browser Initialized");
  }

  async goToPage() {
    if (!this.page) {
      throw new Error('Browser is not initialized. Call launchBrowser first.');
    }
    await this.page.goto(this.url);
  }

  async closeBrowser() {
    if (!this.browser) {
      throw new Error('Browser is not initialized. Nothing to close.');
    }
    await this.browser.close();
  }
}

module.exports = BaseScraper;
