import { ipcMain, app } from 'electron';
import { isPromise } from '../lib/utils';
import api from './api';
import { log, error as logError } from '../logger';
import { err2serializable } from '../lib/utils';

export function init() {
  const ipc = ipcMain;

  ipc.once('ipcReady', function(e: Electron.Event) {
    (app as any).ipcReady = true;
    app.emit('ipcReady');
  });

  ipc.on('api', (event: Electron.Event, actionName: string, payload: any) => {
    const reply = (err: Error | null, replyObj: any) => {
      // 由于 Error 对象 无法序列化, 在 序列化过程中 所有信息会丢失，这里转换下
      const transformedError = err2serializable(err);
      event.sender.send(`${actionName}reply`, transformedError, replyObj);
    };
    log(`received action: ${actionName}`, `payload: ${JSON.stringify(payload)}`);
    if ((api[actionName])) {
      if (isPromise(api[actionName])) {
        api[actionName](event, payload)
          .then((res: any) => reply(null, res))
          .catch((err: Error) => reply(new Error('应用出错'), null));
      } else {
        api[actionName](event, payload, (err: Error | null, data: any) => {
          reply(err, data);
        });
      }
    } else {
      const err = new Error(`未知动作： ${actionName}`);
      logError(err2serializable(err));
    }
  });
}
