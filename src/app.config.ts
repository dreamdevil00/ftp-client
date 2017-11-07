import * as path from 'path';
const APP_NAME = 'Ftp-Client';

const configs = {
  IS_PRODUCTION: false,
  APP_NAME: APP_NAME,
  APP_ICON: path.join(__dirname, '..', 'static', 'logo.png'),
  APP_WINDOW_TITLE: APP_NAME + '测试',
  APP_WINDOW_MAIN_PATH: path.join(__dirname, 'renderer', 'index.html'),


  WINDOW_MIN_HEIGHT: 600,
  WINDOW_MIN_WIDTH: 800,

  CRASH_REPORT_URL: 'https://demosite.com'
};

export default configs;
