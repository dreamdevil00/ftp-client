import { Queue} from './queue';
import { Credentials } from './interfaces';
import * as path from 'path';
import * as fs from 'fs';
import * as stream from 'stream';
import * as EventEmitter from 'events';
import { FtpClient } from './ftp-client';
import { Entry } from './interfaces';
import { ReadyState } from './enums';
import { UserInterface } from './interfaces';

export class Uploader extends EventEmitter {

  private curTransferringId: string | number = -1;

  private lastTransferred = 0;
  private lastProgressTime = 0;
  private speedAverageArr: any[] = [];

  constructor(
    private queue: Queue,
    private ftpClient: FtpClient,
    private user?: UserInterface,
  ) {
    super();
    this.ftpClient.on('error', (error: any) => {
      if (this.user) {
        this.user.sendMessage('error', error, null);
      }
    });
  }

  upload(files: Entry[]) {
    if (files.length) {
      this.queue.addEntries(files);
      if (this.curTransferringId === -1) {
        this.startTransfer();
      }
    } else {
      if (this.user) {
        this.user.sendMessage('error',
          new Error('请提供要传输的文件'), null);
      }
    }
  }

  private startTransfer() {
    const entry = this.queue.nextReadyEntry();
    if (entry) {
      this.uploadEntry(entry);
    } else {
      this.curTransferringId = -1;
      this.ftpClient.disconnect();
    }
  }

  private uploadEntry(entry: Entry) {
    const localPath = entry.localPath;
    const serverPath = entry.serverPath;
    const serverDirectory = entry.isDirectory ? serverPath : path.dirname(serverPath);

    let stepTimeout: NodeJS.Timer;
    let rdStream: fs.ReadStream;

    const error = (err: Error) => {
      clearTimeout(stepTimeout);
      this.errorUploadEntry(err);
    };

    const complete = () => {
      this.step(entry.size);
      clearTimeout(stepTimeout);
      this.completeUploadEntry(entry);
    };

    if (!fs.existsSync(localPath)) {
      const err = new Error(`本地文件 ${localPath} 不存在！`);
      error(err);
      return this.user && this.user.sendMessage('error', err, null);
    }

    const makeSureDirectoryExist = (callback: () => void) => {
      this.ftpClient.readdir(serverDirectory, (err, list) => {
        if (err) {
          this.ftpClient.makedirRecursive(serverDirectory, (makeDirError: any) => {
            if (makeDirError) {
              return error(makeDirError);
            }
            callback();
          });
        }
      });
    };

    const startTransfer = () => {
      makeSureDirectoryExist(() => {
        rdStream = fs.createReadStream(localPath);
        this.ftpClient.upload(rdStream, serverPath, (err) => {
          if (err) {
            error(err);
            return;
          }
          complete();
        });
        stepRecursive();
      });
    };

    // 递归 获取已经传输文件的大小
    const stepRecursive = () => {
      const self = this;
      stepTimeout = setTimeout(function statFunc() {
        self.step(rdStream.bytesRead);
        stepTimeout = setTimeout(statFunc, 500);
      }, 500);
    };
    if (entry.isDirectory) {
      // TODO
    } else {
      this.readyUploadEntry(entry);
      startTransfer();
    }
  }

  private readyUploadEntry(entry: Entry) {
    this.curTransferringId = entry.id;
    this.queue.setEntryStatus(entry.id, ReadyState.Ready);
  }

  private completeUploadEntry(entry: Entry) {
    this.queue.setEntryStatus(this.curTransferringId, ReadyState.Complete);
    this.startTransfer();
  }

  private errorUploadEntry(err: Error) {
    this.queue.setEntryStatus(this.curTransferringId, ReadyState.Error);
  }

  /**
   * 发送传输进度信息
   */
  private step(transferred: number) {
    if (this.lastProgressTime > 0) {
      const speed = (transferred - this.lastTransferred) /
      ((new Date().getTime() - this.lastProgressTime) / 1000);
      this.speedAverageArr.push(speed < 0 ? 0 : speed);
      this.speedAverageArr.slice(-5);

      let speedAverage = null;
      let sum = 0;
      for (let i = 0; i < this.speedAverageArr.length; i++) {
        sum += this.speedAverageArr[i];
      }
      speedAverage = Math.floor(sum / this.speedAverageArr.length);

      const speedInfo = {
        transferred: transferred,
        speed: speed,
        speedAverage: speedAverage,
      };

      const entry = this.queue.getEntryById(this.curTransferringId);
      const progressInfo = Object.assign({}, entry, speedInfo);
      if (this.user) {
        this.user.sendMessage('update-progress', progressInfo, null);
      }
    } else {
      this.lastProgressTime = new Date().getTime();
      this.lastTransferred = transferred;
    }
  }


}
