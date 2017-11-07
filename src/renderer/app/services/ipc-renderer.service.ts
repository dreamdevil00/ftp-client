import { Injectable } from '@angular/core';
import { Credentials } from '../../../main/uploader/src/interfaces';

declare let electron: Electron.AllElectron;

@Injectable()
export class IpcRendererService {

  private ipcRenderer = electron.ipcRenderer;

  constructor() {
    this.setUpIpc();
  }

  private handler = {
    login: (credentials: Credentials) => {
      this.ipcRenderer.send('login', credentials);
    }
  };

  // 监听 main process 事件
  private setUpIpc() {
    this.ipcRenderer.on('log', (e, ...args) => (console as any).log(...args));
    this.ipcRenderer.on('error', (e, ...args) => (console as any).error(...args));
    this.ipcRenderer.send('ipcReady');
  }

  on(message: string, done) {
    return this.ipcRenderer.on(message, done);
  }

  send(message: string, ...args) {
    this.ipcRenderer.send(message, args);
  }

  dispatch(action: string, ...args) {
    const handler = this.handler[action];
    if (handler && typeof handler === 'function') {
      handler(...args);
    } else {
      console.error('dispatch handler 缺失: ' + action);
    }
  }

  api(action: string, payload: any) {
    const reply = new Promise((resolve, reject) => {
      this.ipcRenderer.once(`${action}reply`, (e, err, res) => {
        console.log(`received reply:${action}reply`);
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
    this.ipcRenderer.send('api', action, payload);
    return reply;
  }

  dialog(action: string, ...args) {
    this.ipcRenderer.send('dialog', action, ...args);
  }

  sendSync(message: string, ...args) {
    return this.ipcRenderer.sendSync(message, arguments);
  }
}
