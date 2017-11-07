import { UploaderFactory, FtpClient } from '../../uploader';

/*
export const getClient = (function () {
  let client: FtpClient = null;
  return (): FtpClient => {
    if (client === null) {
    }
    return client;
  };
})();

export const readDir = (e: Electron.Event, path: string): Promise<any> => {
  const client: FtpClient = getClient();
  const promiseRes: Promise<any> = client.readdir(path);
  return promiseRes;
};

export const createDir = (e: Electron.Event, path: string): Promise<any> => {
  const client: FtpClient = getClient();
  const promiseRes: Promise<any> = client.mkdir(path);
  return promiseRes;
}; */
