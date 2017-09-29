import { Injectable } from '@angular/core';
import * as Ftp from 'ftp';
import { Observable } from 'rxjs/Rx';

import { Entry } from './entry';

import * as path from 'path';

@Injectable()
export class FtpService {

  public ftp;
  public connected: boolean;
  public credentials: any;

  public queue: any[] = [];
  public isUploading = false;
  public progress = 0;
  public _nextIndex = 0;


  constructor(
  ) {
    this.ftp = null;
    this.connected = false;
  }

  addToQueue(files: any[]) {
    this.queue = this.queue.concat(files);
  }

  clearQueue(): void {
    this.queue = [];
  }

  uploadEntry(entry: Entry) {

  }

  getConnection(): Observable<any> {
    if (this.connected) {
      return Observable.from([this]);
    }
    return this.connect();
  }

  connect(): Observable<any> {
    const _connect = (cb) => {
      if (!this.connected) {
        this.ftp = new Ftp();
        this.ftp.connect({
          host: this.credentials.host,
          port: this.credentials.port,
          user: this.credentials.username,
          password: this.credentials.password,
        });

        this.ftp.on('ready', () => {
          this.connected = true;
          cb(null, this);
        }).on('error', (error) => {
          this._disconnect();
          cb(error);
        }).on('end', () => {
          this._disconnect();
        });
      } else {
        cb(null, this);
      }
    };
    const connectAsObservable = Observable.bindNodeCallback(_connect);
    return connectAsObservable();
  }

  private _disconnect(cb?) {
    if (!this.connected) { return; }
      this.connected = false;
      let err = null;
      try {
        if (this.ftp) {
          this.ftp.destroy();
          this.ftp = null;
        }
      } catch (error) {
        err = error;
      }
      return cb && cb(err);
    }

  disconnect(): Observable<any> {
    const disconnectAsObservable = Observable.bindNodeCallback(this._disconnect);
    return disconnectAsObservable();
  }

  readdir(directory: string): Observable<any> {
    const _readdir = (cb) => {
    if (this.ftp) {
        this.ftp.list(directory, function(err, list) {
          if (err) {
            return cb(err);
          }
          if (typeof list === 'undefined') {
            const error = new Error('无法读取目录 ' + directory);
            return cb(error);
          }
          const files = [];
          for (let i = 0; i < list.length; i++) {
            const file = list[i];
            if (file.name === '.' || file.name === '..') { continue; }
            let path = directory;
            if (path.substr(-1) !== '/') {
              path += '/';
            }
            path += file.name;
            files.push({
              size: file.size,
              mtime: file.date,
              filename: file.name,
              isDirectory: file.type === 'd',
              path: path,
            });
          }
          cb(null, files);
        });
      }
  };
    const lsAsObservable = Observable.bindNodeCallback(_readdir);
    return lsAsObservable();
  }
  /**
   *
   * Rename a file.
   * from and to are both filepaths
   * @param {string} from
   * @param {string} to
   * @returns {Observable<any>}
   * @memberof FtpService
   */
  rename(from: string, to: string): Observable<any> {
    const _rename = (cb) => {
      this.ftp.rename(from, to, cb);
    };
    const renameAsObservable = Observable.bindNodeCallback(_rename);
    return renameAsObservable();
  }

  mkdir(directory: string): Observable<any> {
    const _mkdir = (cb) => {
      this.ftp.mkdir(directory, cb);
    };
    const mkdirAsObservable = Observable.bindNodeCallback(_mkdir);
    return mkdirAsObservable();
  }

  rmdir(directory, recursive): Observable<any> {
    const _rmdir = (options, cb) => {
      this.ftp.rmdir(options.directory, options.recursive, cb);
    };
    const rmdirAsObservable = Observable.bindNodeCallback(_rmdir);
    return rmdirAsObservable({
      directory: directory,
      recursive: recursive
    });
  }

  rmfile(filePath: string): Observable<any> {
    const _rmfile = (path, cb) => {
      this.ftp.delete(path, cb);
    };
    const rmfileAsObservable = Observable.bindNodeCallback(_rmfile);
    return rmfileAsObservable(filePath);
  }

  abort(): Observable<any> {
    const _abort = (cb) => {
      this.ftp.abort(cb);
    };
    const abortAsObservable = Observable.bindNodeCallback(_abort);
    return abortAsObservable();
  }

  /**
   * Get file stat
   * @param filePath
   */
  stat(filePath: string): Observable<any> {
    const _stat = (path, cb) => {
      if (this.ftp) {
        this.ftp.size(path, function(err, size) {
          if (err) {
            return cb(err);
          }
          this.ftp.lastMod(path, function(error, mtime) {
            if (err) {
              return cb(error);
            }
            cb(null, {
              'filename': path.basename(filePath),
              'path': filePath,
              'size': size,
              'mtime': mtime,
            });
          });
        });
      }
    };
    const statAsObservable = Observable.bindNodeCallback(_stat);
    return statAsObservable(filePath);
  }

  upload(localPath, serverPath, callback) {
    if (this.ftp) {
      this.ftp.put(localPath, serverPath, callback);
    }
  }
}
