import DialogApi from './dialog';
import FtpSettingApi from './ftp-setting';

const api = Object.assign(
  {},
  DialogApi,
  FtpSettingApi,
);

export default api;
