import { app, BrowserWindow, ipcMain } from 'electron';
import config from '../../app.config';

import * as url from 'url';

interface MainInterface {
  win: Electron.BrowserWindow;
  init: (options?) => void;
  send: (...args) => void;
  show: () => void;
  dispatch: (...args) => void;
}
export const main: MainInterface = {
  win: null,
  init,
  send,
  show,
  dispatch,
};


function init(options?: any) {
  if (main.win) {
    return main.win.show();
  }
  const win: Electron.BrowserWindow =
    main.win = new BrowserWindow({
      width: 800,
      height: 600,
      minHeight: config.WINDOW_MIN_HEIGHT,
      minWidth: config.WINDOW_MIN_WIDTH,
      title: config.APP_WINDOW_TITLE,
    });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: config.APP_WINDOW_MAIN_PATH,
    protocol: 'file:',
    slashes: true
  }));

  win.once('ready-to-show', function() {
    if (!options.hidden) {
      win.show();
    }
  });
  win.webContents.openDevTools();

  win.webContents.on('dom-ready', function() {

  });

  win.on('closed', function (e: Electron.Event) {
    if (!(app as any).isQuitting) {
      e.preventDefault();
      hide();
    }
  });
}

function dispatch(...args) {
  send('dispatch', ...args);
}

function setProgress(progress: number) {
  if (!main.win) {
    return;
  }
  main.win.setProgressBar(progress);
}

function hide() {
  if (!main.win) {
    return;
  }
  main.win.hide();
}

function setTitle(title: string) {
  if (!main.win) {
    return;
  }
  main.win.setTitle(title);
}

function show() {
  if (!main.win) {
    return;
  }
  main.win.show();
}

function send(...args) {
  if (!main.win) {
    return;
  }
  // send method is a helper for winInstance.webContents.send(...args);
  (main.win as any).send(...args);
}



// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function getIconPath() {
  return config.APP_ICON;
}
