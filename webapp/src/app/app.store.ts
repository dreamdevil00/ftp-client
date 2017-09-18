import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { Action, ActionReducerMap } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import * as app from './state/app'
import * as ftp from './state/ftp'
import * as auth from './modules/auth'

export interface State {
  app: app.State,
  auth: auth.State,
  ftp: ftp.State,
}

const reducers: ActionReducerMap<State> = {
  app: app.reducer,
  auth: auth.reducer,
  ftp: ftp.reducer,
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      app.AppEffects,
      auth.AuthEffects,
      ftp.FtpEffects,
    ])
  ]
})
export class AppStoreModule {}