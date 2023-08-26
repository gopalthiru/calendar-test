/**
 * Save screenshot of current window
 * @screenshotName  {String}  selector  File name to store the screenshot
 */
export default async (screenshotName: string) => {
  const imageName = screenshotName + '_' + Math.floor(Date.now() / 1000);
  await browser.saveScreenshot(`results/screenshots/${imageName}.png`);
};
