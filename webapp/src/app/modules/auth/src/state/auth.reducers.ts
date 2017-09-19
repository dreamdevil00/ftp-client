import { Actions as Action } from './auth.actions'

export interface State {
  loggedIn: boolean,
  currentUser: any,
}

const initialState: State = {
  loggedIn: false,
  currentUser: null,
}

export function reducer(state = initialState, action: Action): State {
  switch(action.type) {
    case 'AUTH_LOGIN':
      return Object.assign({}, state)

    case 'AUTH_LOGIN_SUCCESS':
      return Object.assign({}, state, {currentUser: action.payload, loggedIn: true})
    default:
      return state
  }
}