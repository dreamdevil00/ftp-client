import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Effect, Actions } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Rx'

import * as app from './app.actions'

import * as ftp from '../packages/ftp-sdk'

@Injectable()
export class AppEffects {

  @Effect({ dispatch: false })
  redirectIndex: Observable<Action> = this.action$
    .ofType(app.ActionTypes.APP_REDIRECT_INDEX)
    .do(() => {
      this.router.navigate(['/' ,'main'])
      this.store
        .dispatch(new ftp.FtpReadDirAction('.'))
    })

  @Effect({ dispatch: false })
  redirectLogin: Observable<Action> = this.action$
    .ofType(app.ActionTypes.APP_REDIRECT_LOGIN)
    .do(() => {
      this.router.navigate(['/', 'login'])
    })

  @Effect({ dispatch: false })
  redirectRouter: Observable<Action> = this.action$
    .ofType(app.ActionTypes.APP_REDIRECT_ROUTER)
    .do(() => {
      this.router.navigate(['/', 'router'])
    })

  constructor(
    private action$: Actions,
    private router: Router,
    private store: Store<any>,
  ) { }
}
