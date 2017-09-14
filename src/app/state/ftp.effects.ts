import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Action, Store } from '@ngrx/store'
import { Effect, Actions } from '@ngrx/effects'

import { FtpService } from '../services/ftp.service'

import * as FtpActions from './ftp.actions'

@Injectable()
export class FtpEffects {
  

  @Effect({ dispatch: false })
  connect: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_CONNECT)
    .do((action: FtpActions.FtpConnectAction) => {
      console.log('in connect effect')
      this.ftpService
        .connect(action.payload)
        .subscribe(
          (success) => {
            this.store.dispatch(new FtpActions.FtpConnectSuccessAction(success))
          },
          (error) => {
            this.store.dispatch(new FtpActions.FtpConnectErrorAction(error))
          }
        )
    })

  @Effect({ dispatch: false })
  connectError: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_CONNECT_ERROR)
    .do(action => {
      console.log('error')
      console.dir(action)
    })

  @Effect({ dispatch: false })
  loginSuccess: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_CONNECT_SUCCESS)
    .do((action: FtpActions.FtpConnectSuccessAction) => {
      this.store.dispatch(new FtpActions.FtpReadDirAction('.'))
    })


  @Effect({dispatch: false })
  readDir: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_READDIR)
    .do((action: FtpActions.FtpReadDirAction) => {
      this.ftpService
        .readdir(action.payload)
        .subscribe(
          (success) => {
            this.store.dispatch(new FtpActions.FtpReadDirSuccessAction(success))
          },
          (error) => {
            this.store.dispatch(new FtpActions.FtpReadDirErrorAction(error))
          }
        )
    })

  @Effect({dispatch: false})
  readDirError: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_READDIR_ERROR)
    .do((action: FtpActions.FtpReadDirErrorAction) => {
      console.log('readdir error: ')
      console.log(action.payload)
    })

  @Effect({dispatch: false})
  readDirSuccess: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_READDIR_SUCCESS)
    .do((action: FtpActions.FtpReadDirSuccessAction) => {
      this.ftpService.filesList = action.payload
      console.log('readdir success:')
      console.dir(action.payload)
    })

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private ftpService: FtpService,
  ) {}
}