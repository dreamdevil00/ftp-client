import { app } from 'electron';
import { FtpClient } from '../../lib/ftp-client';
import user from '../../user/user';
import { UploaderFactory } from '../../uploader/src/index';

const api = {
  login: (e: Electron.Event, payload: any,
    callback?: (err: Error | null, data?: any) => void) => {
    (app as any).uploader = UploaderFactory(payload, user);
    (app as any).ftpClient = new FtpClient(payload);
    (app as any).ftpClient.getConnection((err: Error, ftp: any) => {
      if (err) {
        return callback && callback(err);
      } else {
        return callback && callback(null, ftp);
      }
    });
  },
  logout: (e: Electron.Event, payload: any, callback?: (err: Error | null, data?: any) => void) => {}
};

export default api;


