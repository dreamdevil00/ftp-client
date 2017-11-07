import { app, Tray, Menu } from 'electron';

import config from '../app.config';

export function init() {
  createTray();
}

let tray;

function createTray() {
  tray = new Tray(getIconPath());
}

function updateTrayMenu() {

}

function getMenuTemplate() {
  return [

  ];

  function getToggleItem() {

  }
}
function getIconPath(): string {
  return config.APP_ICON;
}
