import config from './app.config';
import { crashReporter } from 'electron';
export function init() {
  crashReporter.start({
    productName: config.APP_NAME,
    companyName: config.APP_NAME,
    submitURL: config.CRASH_REPORT_URL,
    uploadToServer: false,
  });
}
