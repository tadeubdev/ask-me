const wppconnect = require('@wppconnect-team/wppconnect');
const {onMessageWppConnectRepository, onNewMessageWppconnectRepository, retrieveOldMessagesWppConnectRepository, replyMessageWppconnectRepository} = require('./repositories');

const puppeteerOptions = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
  ],
  userDataDir: ''
}

const chromiumArgs = [
  '--disable-web-security', '--no-sandbox',
  '--aggressive-cache-discard', '--disable-cache', '--disable-application-cache',
  '--disable-offline-load-stale-cache', '--disk-cache-size=0',
  '--disable-background-networking', '--disable-default-apps', '--disable-extensions',
  '--disable-sync', '--disable-translate', '--hide-scrollbars', '--metrics-recording-only',
  '--mute-audio', '--no-first-run', '--safebrowsing-disable-auto-update',
  '--ignore-certificate-errors', '--ignore-ssl-errors', '--ignore-certificate-errors-spki-list',

  '--disable-setuid-sandbox', '--hide-scrollbars', '--no-zygote', '--single-process',
  '--log-level=3', '--no-default-browser-check', '--disable-site-isolation-trials', '--no-experiments',
  '--ignore-gpu-blacklist', '--disable-gpu', '--enable-features=NetworkService',
  '--disable-dev-shm-usage', '--disable-webgl', '--disable-threaded-animation',
  '--disable-threaded-scrolling', '--disable-in-process-stack-traces',
  '--disable-histogram-customizer', '--disable-gl-extensions', '--disable-composited-antialiasing',
  '--disable-canvas-aa', '--disable-3d-apis', '--disable-accelerated-2d-canvas',
  '--disable-accelerated-jpeg-decoding', '--disable-accelerated-mjpeg-decode',
  '--disable-app-list-dismiss-on-blur', '--disable-accelerated-video-decode',
];

const makeOptionsWithSession = (session) => {
  return {
    session: session,
    catchQR: undefined,
    statusFind: undefined,
    onLoadingScreen: undefined,
    headless: true, // Headless chrome
    devtools: false, // Open devtools by default
    useChrome: true, // If false will use Chromium instance
    debug: false, // Opens a debug session
    logQR: true, // Logs QR automatically in terminal
    browserWS: '', // If u want to use browserWSEndpoint
    browserArgs: chromiumArgs, // Parameters to be added into the chrome browser instance
    puppeteerOptions: puppeteerOptions, // Will be passed to puppeteer.launch
    disableWelcome: true, // Option to disable the welcoming message which appears in the beginning
    updatesLog: true, // Logs info updates automatically in terminal
    autoClose: 60000, // Automatically closes the wppconnect only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
    tokenStore: 'file', // Define how work with tokens, that can be a custom interface
    folderNameToken: './session', //folder name when saving tokens
  };
};

const makeClientWppconnectBuilder = (session) => {
  return {
    mount: async () => {
      const options = makeOptionsWithSession(session);
      await wppconnect.create(options).catch(error => {
        console.error('Something went wrong when trying to connecto to wppconnect:', error.message);
      });
      return {
        makeOnMessageRepository: onMessageWppConnectRepository(),
        onNewMessageRepository: onNewMessageWppconnectRepository(client),
        retrieveOldMessagesRepository: retrieveOldMessagesWppConnectRepository(client),
        replyMessageRepository: replyMessageWppconnectRepository(client),
      };
    }
  };
};

module.exports = makeClientWppconnectBuilder;
