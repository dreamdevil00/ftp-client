import { app } from 'electron';
import { main } from '../windows';

export function log(...args) {
  if ((app as any).ipcReady) {
    main.send('log', ...args);
  } else {
    (app as any).once('ipcReady', () => main.send('log', ...args));
  }
}

export function error(...args) {
  if ((app as any).ipcReady) {
    main.send('error', ...args);
  } else {
    (app as any).once('ipcReady', () => main.send('error', ...args));
  }
}
