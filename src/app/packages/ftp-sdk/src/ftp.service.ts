import { Injectable } from '@angular/core'
import * as Ftp from 'ftp'
import { Observable } from 'rxjs/Rx'
import * as path from 'path'
import { FtpUser } from './ftp-user'
import { Queue } from './queue'
import * as storage from 'electron-json-storage'

@Injectable()
export class FtpService {

  public ftp
  public connected: boolean
  public static instance: any

  constructor(
  ) { 
    this.ftp = null
    this.connected = false
  }

  connect() : Observable<any> {
    const _connect = (cb) => {
      if (!this.connected) {
        this.ftp = new Ftp()
        storage.get('credentials', (err, credentials) => {
          this.ftp.connect({
          host: credentials.host,
          port: credentials.port,
          user: credentials.username,
          password: credentials.password,
        })

        this.ftp.on('ready', () => {
          this.connected = true
          FtpService.instance = this
          let user = new FtpUser()

          cb(null, this)
        }).on('error', (err) => {
          this._disconnect()
          cb(err)
        }).on('end', () => {
          this._disconnect()
        })
        })  
      } else {
        cb(null, this)
      }
    }
    let connectAsObservable = Observable.bindNodeCallback(_connect)
    return connectAsObservable()
  }

  private _disconnect(cb?) {
    if (!this.connected) return
      this.connected = false
      FtpService.instance = null
      let err = null
      try {
        if (this.ftp) {
          this.ftp.destroy()
          this.ftp = null
        }
      } catch(error) {
        err = error
      }
      cb && cb(err)
    }

  disconnect(): Observable<any> {
    let disconnectAsObservable = Observable.bindNodeCallback(this._disconnect)
    return disconnectAsObservable() 
  }

  readdir(directory: string): Observable<any> {
    const _readdir = (directory, cb) => {
    if (this.ftp) {
        this.ftp.list(directory, function(err, list) {
          if (err) {
            return cb(err)
          }
          if (typeof list === 'undefined') {
            let err = new Error('无法读取目录 ' + directory)
            return cb(err)
          }
          let files = []
          for (let i = 0; i < list.length; i++) {
            let file = list[i]
            if (file.name === '.' || file.name === '..') continue
            let path = directory
            if (path.substr(-1) !== '/') {
              path += '/'
            }
            path += file.name
            files.push({
              size: file.size,
              mtime: file.date,
              filename: file.name,
              isDirectory: file.type === 'd',
              path: path,
            })
          }
          cb(null, files)
        })
      }
  }
    let lsAsObservable = Observable.bindNodeCallback(_readdir)
    return lsAsObservable(directory)
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
    const _rename = (from, to, cb) => {
      this.ftp.rename(from, to, cb)
    }
    const renameAsObservable = Observable.bindNodeCallback(_rename)
    return renameAsObservable(from, to)
  }

  mkdir(directory: string): Observable<any> {
    const _mkdir = (directory, cb) => {
      this.ftp.mkdir(directory, cb)
    }
    let mkdirAsObservable = Observable.bindNodeCallback(_mkdir)
    return mkdirAsObservable(directory)
  }

  rmdir(directory, recursive): Observable<any> {
    const _rmdir = (options, cb) => {
      this.ftp.rmdir(options.directory, options.recursive, cb)
    }
    let rmdirAsObservable = Observable.bindNodeCallback(_rmdir)
    return rmdirAsObservable({
      directory: directory,
      recursive: recursive
    })
  }

  rmfile(filePath: string): Observable<any> {
    const _rmfile = (filePath, cb) => {
      this.ftp.delete(filePath, cb)
    }
    let rmfileAsObservable = Observable.bindNodeCallback(_rmfile)
    return rmfileAsObservable(filePath)
  }

  abort(): Observable<any> {
    const _abort = (cb) => {
      this.ftp.abort(cb)
    }
    let abortAsObservable = Observable.bindNodeCallback(_abort)
    return abortAsObservable()
  }

  /**
   * Get file stat
   * @param filePath 
   */
  stat(filePath: string): Observable<any> {
    const _stat = (filePath, cb) => {
      if (this.ftp) {
        this.ftp.size(filePath, function(err, size) {
          if (err) {
            return cb(err)
          }
          this.ftp.lastMod(filePath, function(err, mtime) {
            if (err) {
              return cb(err)
            }
            cb(null, {
              'filename': path.basename(filePath),
              'path': filePath,
              'size': size,
              'mtime': mtime,
            })
          })
        })
      }
    }
    let statAsObservable = Observable.bindNodeCallback(_stat)
    return statAsObservable(filePath)
  }

  static getInstance(): Observable<any> {
    if (FtpService.instance) {
      return Observable.from([FtpService.instance])
    }
    const server = new FtpService()
    FtpService.instance = server
    return server.connect()
  }
}