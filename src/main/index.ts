import { ipcMain, app } from 'electron';
import { parallel } from 'async';
import config from '../app.config';
import { main } from './windows';
import { init as crashReportInit } from '../crash-reporter';
import { init as ipcInit } from './ipc';
import * as log from './logger';

if (config.IS_PRODUCTION) {
  process.env.NODE_ENV = 'production';
}

init();

function init() {
  let isReady = false; // app ready, windows can be created
  (app as any).ipcReady = false; // main window has finished loading and IPC is ready
  (app as any).isQuitting = false;
  (app as any).ftpClient = null; // ftpClient for manipulating files
  (app as any).uploader = null; // ftpClient for uploading

  parallel({
    appReady: (cb) => app.on('ready', () => cb(null)),
  }, onReady);

  function onReady(err, results) {
    if (err) {
      throw err;
    }

    isReady = true;
    main.init();
  }

  ipcInit();

  app.once('will-finish-launching', function() {
    crashReportInit();
  });

  app.on('before-quit', function(e) {
    if ((app as any).isQuitting) {
      return;
    }

    (app as any).isQuitting = true;
  });

  app.on('activate', function() {
    if (isReady) {
      main.show();
    }
  });
}
