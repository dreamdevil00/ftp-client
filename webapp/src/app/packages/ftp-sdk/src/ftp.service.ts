import { Injectable } from '@angular/core'
import * as JSFtp from 'jsftp'
import { Observable } from 'rxjs/Rx'
import { Subscription } from 'rxjs/Rx'
import { Store } from '@ngrx/store'

@Injectable()
export class FtpService {

  private ftp
  public connected: boolean

  constructor(
    private store: Store<any>,
  ) { 
    this.ftp = null
    this.connected = false
  }

  connect(credentials: any) : Observable<any> {
    const self = this
    const _connect = function(credentials, cb) {
      if (!self.connected) {
        self.ftp = new JSFtp({
          host: credentials.host,
          port: credentials.port,
          user: credentials.username,
          pass: credentials.password,
        })
      }
      cb(null, self.ftp)   
    }

    let connectAsObservable = Observable.bindNodeCallback(_connect)
    return connectAsObservable(credentials)
  }

  disconnect(): Observable<any> {
    let self = this
    let _disconnect = function(cb) {
      let err = null
      try {
        self.ftp.destroy()
        self.ftp = null
        self.connected = false
      } catch(error) {
        err = error
      }
      cb(err)
    }
    let disconnectAsObservable = Observable.bindNodeCallback(_disconnect)
    return disconnectAsObservable()
    
  }

  readdir(directory: string): Observable<any> {
    const self = this
    const _ls = function(filePath, cb) {
      self.ftp.ls(filePath, cb)
    }

    let lsAsObservable = Observable.bindNodeCallback(_ls)
    return lsAsObservable(directory)
  }

  getCurDirFilesList(successCb, errorCb): Subscription {
    return this.store
      .select('ftp')
      .subscribe((res) => {
        let curDir = res.currentDir
        this.readdir(curDir)
          .subscribe(successCb, errorCb)
      })
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
    const self = this
    const _rename = function(from, to, cb) {
      self.ftp.rename(from, to, cb)
    }
    const renameAsObservable = Observable.bindNodeCallback(_rename)
    return renameAsObservable(from, to)
  }

  mkdir(directory: string): Observable<any> {
    const self = this
    const _mkdir = function(directory, cb) {
      self.ftp.raw('mkd', directory, cb)
    }

    let mkdirAsObservable = Observable.bindNodeCallback(_mkdir)
    return mkdirAsObservable(directory)
  }

  rmdir(directory: string): Observable<any> {
    const _rmdir = (directory, cb) => {
      this.ftp.raw('rmd', directory, cb)
    }
    let rmdirAsObservable = Observable.bindNodeCallback(_rmdir)
    return rmdirAsObservable(directory)
  }
}