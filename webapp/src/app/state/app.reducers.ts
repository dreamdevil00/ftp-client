//import { Action, ActionReducer } from '@ngrx/store'

import { Actions as Action } from './app.actions'

export interface State {
  development: boolean,
}

const initialState: any = {
  development: true,
}

export function reducer(state = initialState, action: Action): State {
  switch(action.type) {
    default:
      return state
  }
}