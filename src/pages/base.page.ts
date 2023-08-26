export default class BasePageObject {
  protected _pageId = $('undefined');

  public async isPageLoaded() {
    await this._pageId.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: `Page object not loaded: ${this.constructor.name}`
    });
  }

}
