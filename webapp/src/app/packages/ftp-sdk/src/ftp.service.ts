import { Injectable } from '@angular/core'
import * as JSFtp from 'jsftp'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class FtpService {

  private ftp
  public connected: boolean

  public filesList: any[]
  public currentDir: string = '.'

  constructor(
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

        let _cb = cb
        cb = function(err, data) {
          if (err) {
            return _cb(err)
          }
          self.connected = true
          _cb(err, data)
        }
        self.ftp.auth(credentials.username, credentials.password, cb)
      } else {
        cb(null, null)
      }
      
    }

    let auth = Observable.bindNodeCallback(_connect)
     return auth(credentials)
  }

  disconnect(): Observable<any> {
    let self = this
    let _disconnect = function(cb) {
      let err = null
      try {
        self.ftp.destroy()
        self.ftp = null
        self.connected = false
        self.filesList = []
        self.currentDir = '.'
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
}