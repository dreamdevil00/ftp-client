import DialogApi from './dialog';
import FtpSettingApi from './ftp-setting';
import AuthApi from './auth';
import DirectoryApi from './directory';
import FileAPi from './file';

const api = Object.assign(
  {},
  DialogApi,
  FtpSettingApi,
  AuthApi,
  DirectoryApi,
  FileAPi,
);

export default api;
