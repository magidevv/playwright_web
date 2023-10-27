class Page {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async openUrl(url) {
    await this.page.goto(url == undefined ? "/" : url);
    await this.page.waitForLoadState("load");
  }

  async getElement(element) {
    return await this.page.locator(element);
  }

  async clickElement(element) {
    await (await this.getElement(element)).click();
  }

  async fillElement(element, data) {
    await (await this.getElement(element)).fill(data);
  }
}

module.exports = { Page };
