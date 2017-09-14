import * as FtpActions from './ftp.actions'

export type Action = FtpActions.Actions

export interface State {
  settings: any,
  currentDir: string | null,
  loggedIn: boolean
}

const initialState: State = {
  settings: {nodeEnv: 'development'},
  currentDir: '.',
  loggedIn: false,
}

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case 'FTP_CONNECT':
      return Object.assign({}, state)
    
    case 'FTP_CONNECT_SUCCESS':
      return Object.assign({}, state, { loggedIn: true })

    default:
      return state
  }
}