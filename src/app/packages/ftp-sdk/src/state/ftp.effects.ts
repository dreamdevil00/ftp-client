import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Action, Store } from '@ngrx/store'
import { Effect, Actions } from '@ngrx/effects'

import { FtpService } from '../ftp.service'

import * as FtpActions from './ftp.actions'

@Injectable()
export class FtpEffects {
  

  @Effect({ dispatch: false })
  connect: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_CONNECT)
    .do((action: FtpActions.FtpConnectAction) => {
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
    })

  @Effect({dispatch: false})
  createDir: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_CREATEDIR)
    .do(
      (action: FtpActions.FtpCreateDirAction) => {
        this.ftpService
          .mkdir(action.payload.path)
          .subscribe(
            (success) => {
              this.store.dispatch(new FtpActions.FtpCreateDirSuccessAction({
                payload: action.payload,
                result: success,
              }))
            },
            (error) => {
              this.store.dispatch(new FtpActions.FtpCreateDirErrorAction({
                payload: action.payload,
                result: error,
              }))
            }
          )
      }
    )

  @Effect({dispatch: false})
  createDirError: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_CREATEDIR_ERROR)
    .do(
      (action: FtpActions.FtpCreateDirErrorAction) => {
        console.log('create dir failed ', action.payload)
      }
    )

  @Effect({ dispatch: false })
  createDirSuccess: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_CREATEDIR_SUCCESS)
    .do(
    (action: FtpActions.FtpCreateDirSuccessAction) => {
      let currentDir = action.payload.payload.currentDir
      this.store.dispatch(new FtpActions.FtpReadDirAction(currentDir))
    }
    )

  @Effect({dispatch: false})
  removeDir: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_REMOVEDIR)
    .do(
      (action: FtpActions.FtpRemoveDirAction) => {
        this.ftpService
          .rmdir(action.payload.path)
          .subscribe(
            (success) => {
              this.store
                .dispatch(new FtpActions.FtpRemoveDirSuccessAction({
                  payload: action.payload,
                  result: success
                }))
            },
            (error) => {
              this.store
                .dispatch(new FtpActions.FtpRemoveDirErrorAction({
                  payload: action.payload,
                  result: error
                }))
            }
          )
      }
    )

  @Effect({dispatch: false})
  removeDirError: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_REMOVEDIR_ERROR)
    .do(
      (action: FtpActions.FtpRemoveDirErrorAction) => {
        console.log('remove dir error: ', action.payload)
      }
    )

  @Effect({ dispatch: false })
  removeDirSuccess: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_REMOVEDIR_SUCCESS)
    .do(
    (action: FtpActions.FtpRemoveDirSuccessAction) => {
      let currentDir = action.payload.payload.currentDir
      this.store.dispatch(new FtpActions.FtpReadDirAction(currentDir))
    }
    )

  @Effect({ dispatch: false })
  removeFile: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_REMOVEFILE)
    .do(
    (action: FtpActions.FtpRemoveFileAction) => {
      this.ftpService
        .rmfile(action.payload)
        .subscribe(
        (success) => {
          this.store
            .dispatch(new FtpActions.FtpRemoveFileSuccessAction({
                  payload: action.payload,
                  result: success
                }))
        },
        (error) => {
          this.store
            .dispatch(new FtpActions.FtpRemoveFileErrorAction({
                  payload: action.payload,
                  result: error
                }))
        }
        )
    }
    )

  @Effect({ dispatch: false })
  removeFileError: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_REMOVEFILE_ERROR)
    .do(
    (action: FtpActions.FtpRemoveFileErrorAction) => {
      console.log('remove dir error: ', action.payload)
    }
    )

  @Effect({ dispatch: false })
  removeFileSuccess: Observable<Action> = this.actions$
    .ofType(FtpActions.ActionTypes.FTP_REMOVEFILE_SUCCESS)
    .do(
    (action: FtpActions.FtpRemoveFileSuccessAction) => {
      let currentDir = action.payload.payload.currentDir
      this.store.dispatch(new FtpActions.FtpReadDirAction(currentDir))
    }
    )

  

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private ftpService: FtpService,
  ) {}
}