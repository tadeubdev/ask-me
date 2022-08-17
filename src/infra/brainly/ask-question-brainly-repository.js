const args = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-infobars',
  '--window-position=0,0',
  '--ignore-certifcate-errors',
  '--ignore-certifcate-errors-spki-list',
  '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
];

const options = {
  args,
  headless: false,
  ignoreHTTPSErrors: true,
  userDataDir: './tmp'
};

const puppeteer = require('puppeteer-extra');
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const askQuestionBrainlyRepository = async (question) => {
  return new Promise((resolve) => {
    const query = encodeURIComponent(question);

    puppeteer.launch(options).then(async browser => {
      const page = (await browser.pages()).length? (await browser.pages())[0]: await browser.newPage();
      await page.goto('https://brainly.com.br/app/ask?entry=hero&q=' + query);
      await page.waitForTimeout(5000)
      await browser.close();

      const answers = await page.evaluate(() => {
        const answers = Array.from(document.querySelectorAll('.answer-text')).map(answer => answer.innerText);
        return answers;
      });

      resolve(answers);
    });
  });
}

module.exports = askQuestionBrainlyRepository;
