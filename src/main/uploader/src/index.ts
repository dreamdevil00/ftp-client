import { Uploader } from './uploader';
import { FtpClient } from './ftp-client';
import { Queue } from './queue';
import { Credentials, UserInterface } from './interfaces';

export function UploaderFactory(credentials: Credentials, user?: UserInterface): Uploader {
  if ((UploaderFactory as any).instance === null) {
    const ftpClient = new FtpClient(credentials);
    const queue = new Queue(user);
    const uploader = new Uploader(
      queue,
      ftpClient,
      user
    );
    (UploaderFactory as any).instance = uploader;
  }
  return (UploaderFactory as any).instance;
}

(UploaderFactory as any).instance = null;

export * from './enums';
export * from './interfaces';
export * from './ftp-client';
export * from './uploader';




