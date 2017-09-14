import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { Action, ActionReducerMap } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import * as app from './state'

export interface State {
  app: app.State
}

const reducers: ActionReducerMap<State> = {
  app: app.reducer,
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      app.FtpEffects,
    ])
  ]
})
export class AppStoreModule {}