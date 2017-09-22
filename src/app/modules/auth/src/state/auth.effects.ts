import { get } from 'lodash'
import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as auth from './auth.actions'
import * as ftp from '../../../../packages/ftp-sdk'
import { AuthService } from '../auth.service'

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  login: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.AUTH_LOGIN)
    .do((action: auth.AuthLoginAction) => {
      return this.ftpService
        .connect(action.payload)
        .subscribe(
          (success) => {
            this.store
              .dispatch(new ftp.FtpReadDirAction('.'))
            this.store
              .dispatch(new auth.AuthLoginSuccessAction(success))
          })
    })

  @Effect({ dispatch: false })
  loginError: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.AUTH_LOGIN_ERROR)
    .do((action) => {})

  @Effect({ dispatch: false })
  loginSuccess: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.AUTH_LOGIN_SUCCESS)
    .do((action) => {
      return this.store
        .dispatch({ type: 'APP_REDIRECT_ROUTER'})
    })

  @Effect({ dispatch: false })
  logout: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.AUTH_LOGOUT)
    .do(() => {
    })

  @Effect({ dispatch: false })
  logoutError: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.AUTH_LOGOUT_ERROR)
    .do((action) => {
    })

  @Effect({ dispatch: false })
  logoutSuccess: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.AUTH_LOGOUT_SUCCESS)
    .do(() => {
    })

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private authService: AuthService,
    private ftpService: ftp.FtpService,
  ) {
  }

}
