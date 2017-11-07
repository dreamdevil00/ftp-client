import { app } from 'electron';

const FileAPi = {
  removeFile: (e: Electron.Event, payload: string, callback: (err: Error | null, data?: any) => void) => {
    if ((app as any).ftpClient) {
      (app as any).ftpClient.removeFile(payload, callback);
    } else {
      const error = new Error('ftp 客户端未正确初始化, ftpClient 不能为空');
      callback(error);
    }
  }
};

export default FileAPi;


