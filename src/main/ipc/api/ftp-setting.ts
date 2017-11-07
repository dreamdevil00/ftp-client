import { Status, Setting } from '../../lib/setting-dao';
import { log, error as LogError } from '../../logger';

const FtpSettingApi = {
  saveSetting: (e: Electron.Event, credentials: any,
    callback?: (e: Error | null, data?: any) => void) => {
    Setting.set('ftp.credentials', credentials, (status, keyPath, value) => {
      let err = null;
      if (status === Status.SUCCESS) {
        e.returnValue = {
          keyPath,
          value,
        };
      } else {
        e.returnValue = null;
        err = new Error('设置失败');
      }
      return callback && callback(err, {
        keyPath,
        value,
      });
    });
  },
  clearSetting: (e: Electron.Event, payload: any) => {
    Setting.remove('ftp.credentials');
  },
  getSetting: (e: Electron.Event, payload: any, callback?: (e: Error | null, data?: any) => void) => {
    Setting.get('ftp.credentials', (status, value) => {
      let err = null;
      if (status === Status.SUCCESS) {
        e.returnValue = value;
      } else {
        e.returnValue = null;
        err = new Error('获取失败');
      }
      return callback && callback(err, value);
    });
  }
};

export default FtpSettingApi;


