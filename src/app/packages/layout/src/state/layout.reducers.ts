import { Actions as Action } from './layout.actions'
export interface State {
}

const initialState: State = {

}

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state
  }
}