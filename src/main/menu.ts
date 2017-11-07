import { app, Menu } from 'electron';
import config from '../app.config';

let menu: Electron.Menu = null;

export function init() {
  menu = Menu.buildFromTemplate(getMenuTemplate());
  Menu.setApplicationMenu(menu);
}

function getMenuTemplate(): Electron.MenuItemConstructorOptions[] {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: '传输',
      submenu: [
        {
          label: '全部暂停',
          click: () => {}
        }
      ]
    }
  ];
  return template;
}

