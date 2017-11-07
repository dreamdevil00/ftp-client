import { app } from 'electron';

const initError = new Error('ftp 客户端未正确初始化, ftpClient 不能为空');

const DirectoryAPi = {
  readDir: (e: Electron.Event, payload: string, callback: (err: Error | null, data?: any) => void) => {
    if ((app as any).ftpClient) {
      (app as any).ftpClient.readdir(payload, callback);
    } else {
      callback(initError);
    }
  },
  createDir: (e: Electron.Event, payload: any, callback: (err: Error | null, data?: any) => void) => {
    if ((app as any).ftpClient) {
      (app as any).ftpClient.makedirRecursive(payload, callback);
    } else {
      callback(initError);
    }
  },
  removeDir: (e: Electron.Event, payload: any, callback: (err: Error | null, data?: any) => void) => {
    if ((app as any).ftpClient) {
      (app as any).ftpClient.removeDir(payload, callback);
    } else {
      callback(initError);
    }
  },
  changeDir: (e: Electron.Event, payload: any, callback: (err: Error | null, data?: any) => void) => {
    if ((app as any).ftpClient) {
      (app as any).ftpClient.readdir(payload, callback);
    } else {
      callback(initError);
    }
  }
};

export default DirectoryAPi;


