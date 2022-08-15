const puppeteer = require('puppeteer');

const askQuestion = async (question) => {
  const puppeteer = require('puppeteer-extra')

  // add stealth plugin and use defaults (all evasion techniques)
  const StealthPlugin = require('puppeteer-extra-plugin-stealth')
  puppeteer.use(StealthPlugin())

  const query = encodeURIComponent(question);

  // puppeteer usage as normal
  puppeteer.launch({ headless: true }).then(async browser => {
    const page = await browser.newPage()
    await page.goto('https://brainly.com.br/app/ask?entry=hero&q=' + query);
    await page.waitForTimeout(5000)
    await page.screenshot({ path: 'testresult.png', fullPage: true })
    await browser.close()
    console.log(`All done, check the screenshot. ✨`)
  })

  // await page.waitFor(1000);
  // const result = await page.evaluate(async () => {
  //   const links = await page.$x("//a[contains(., 'Ver respostas')]");
  //   console.log('links', links)
  //   if (links.length > 0) {
  //     const link = links[0];
  //     return link.href;
  //   }
  //   return null;
  // }).catch(() => {
  //   return null;
  // }).finally(() => {
  //   browser.close();
  // });
  // console.log('Result', result);
  // await page.waitFor(100000);
  // await browser.close();
}

module.exports = askQuestion;
