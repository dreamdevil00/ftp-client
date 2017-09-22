import { Actions as Action } from './ftp.actions'

export interface State {
  settings: any,
  currentDir: string | null,
  filesList: any[],
  loggedIn: boolean
}

const initialState: State = {
  settings: {nodeEnv: 'development'},
  currentDir: '/',
  filesList: [],
  loggedIn: false,
}

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case 'FTP_CONNECT':
      return Object.assign({}, state)
    
    case 'FTP_CONNECT_SUCCESS':
      return Object.assign({}, state, { loggedIn: true })

    case 'FTP_READDIR_SUCCESS':
      return Object.assign({}, state, {filesList: action.payload})

    default:
      return state
  }
}