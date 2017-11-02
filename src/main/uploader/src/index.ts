import { Uploader } from './uploader';
import { FtpClient } from './ftp-client';
import { Queue } from './queue';
import { Credentials, UserInterface } from './interfaces';

export function UploaderFactory(credentials: Credentials, user?: UserInterface) {
  const ftpClient = new FtpClient(credentials);
  const queue = new Queue(user);
  const uploader = new Uploader(
    queue,
    ftpClient,
    user
  );

  return uploader;
}

export * from './enums';
export * from './interfaces';




