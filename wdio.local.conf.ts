/* eslint-disable no-console */
import path from 'node:path';
import url from 'node:url';

import { config as buildConfig } from './wdio.conf.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

buildConfig.capabilities = [
  {
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        // '--headless',
        '--disable-infobars',
        '--window-size=1920,1080',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--ignore-certificate-errors',
        // '--auto-open-devtools-for-tabs'
      ]
    }
  }
];
buildConfig.baseUrl = process.env.BASE_URL ||'http://localhost:3000';
buildConfig.maxInstances = 1;
buildConfig.services = [];
// buildConfig.logLevel = 'debug';

export const config = buildConfig;
