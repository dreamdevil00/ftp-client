import * as path from 'path';
import * as Ftp from 'ftp';
import * as EventEmitter from 'events';

export class FtpClient extends EventEmitter {

  private ftp: Ftp | null = null;
  private connected = false;

  constructor(
    private credentials: any,
  ) {
    super();
  }

  isConnected(): boolean {
    return this.connected;
  }

  getConnection(callback: (err: Error | null, ftp?: Ftp | null) => void) {
    if (!this.isConnected()) {
      this.ftp = new Ftp();
      this.ftp.connect(this.credentials);
      this.ftp.on('ready', () => {
        callback(null, this.ftp);
      })
        .on('error', (error: Error) => {
          this.disconnect();
          callback(error);
        })
        .on('end', () => {
          this.disconnect();
        });
    } else {
      callback(null, this.ftp);
    }
  }

  /**
   * 从FTP服务器断开连接
   */
  disconnect() {
    if (this.connected) {
      this.connected = false;
      if (this.ftp) {
        this.ftp.destroy();
      }
      this.ftp = null;
    }
  }

  /**
   * 递归创建目录
   * @param directory 要创建的目录
   * @param callback
   */
  makedirRecursive(directory: string, callback: (error: Error | null) => void) {
    this.getConnection((err, ftp) => {
      if (!err && ftp) {
        ftp.mkdir(directory, true, callback);
      } else {
        callback(err);
      }
    });
  }

  /**
   * 上传文件到服务器
   * @param localPath 本地文件路径
   * @param serverPath 服务器文件路径
   * @param callback 回调函数
   */
  upload(localPath: string | NodeJS.ReadableStream | Buffer,
    serverPath: string, callback: (error: Error) => void) {
    this.getConnection((err, ftp) => {
      if (err) {
        return callback(err);
      }
      if (ftp) {
        ftp.put(localPath, serverPath, callback);
      }
    });
  }

  /**
   * 读取目录文件列表
   * @param directory 要读取的目录
   * @param callback 回调函数
   */
  readdir(directory: string, callback: (err: Error | null, list?: any[]) => void) {
    this.getConnection((err, ftp) => {
      if (err) {
        return callback(err);
      }
      if (ftp) {
        ftp.listSafe(directory, false, (error, list) => {
          if (error) {
            return callback(error);
          }
          if (typeof list === 'undefined') {
            return;
          }
          const files = [];
          for (let i = 0; i < list.length; i++) {
            const file = list[i];
            if (file.name === '.' || file.name === '..') {
              continue;
            }
            let path = directory;
            if (path.substr(-1) !== '/') {
              path += '/';
            }
            files.push({
              size: file.size,
              filename: file.name,
              isDirectory: file.type === 'd',
              path: path + file.name,
            });
          }
          callback(null, files);
        });
      }
    });
  }

  /**
   * 删除ftp服务器上的文件
   * @param filePath 文件路径
   * @param callback 回调函数
   */
  removeFile(filePath: string, callback: (err: Error | null) => void) {
    this.getConnection((err, ftp) => {
      if (err) {
        return callback(err);
      }
      if (ftp) {
        ftp.delete(filePath, callback);
      }
    });
  }

  removeDir(directory: string, callback: (err: Error | null) => void) {
    this.getConnection((err, ftp) => {
      if (err) {
        return callback(err);
      }
      if (ftp) {
        ftp.rmdir(directory, true, callback);
      }
    });
  }

  /**
   * 获取ftp服务器上的文件信息
   * @param filePath 文件路径
   * @param callback 回调函数
   */
  stat(filePath: string, callback: (error: Error | null, statInfo?: any) => void) {
    this.getConnection((err, ftp: Ftp) => {
      if (!err && ftp) {
        ftp.size(filePath, (error, fileSize) => {
          if (error) {
            return callback(error);
          }
          return callback(null, {
            filename: path.basename(filePath),
            path: filePath,
            size: fileSize,
          });
        });
      } else {
        return callback(err);
      }
    });
  }
}
