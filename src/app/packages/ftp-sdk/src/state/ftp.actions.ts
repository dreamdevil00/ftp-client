import { Action } from '@ngrx/store'

export const ActionTypes = {
  FTP_CONNECT:         'FTP_CONNECT',
  FTP_CONNECT_ERROR:   'FTP_CONNECT_ERROR',
  FTP_CONNECT_SUCCESS: 'FTP_CONNECT_SUCCESS',

  FTP_DISCONNECT:         'FTP_DISCONNECT',
  FTP_DISCONNECT_ERROR:   'FTP_DISCONNECT_ERROR',
  FTP_DISCONNECT_SUCCESS: 'FTP_DISCONNECT_SUCCESS',

  FTP_READDIR:         'FTP_READDIR',
  FTP_READDIR_ERROR:   'FTP_READDIR_ERROR',
  FTP_READDIR_SUCCESS: 'FTP_READDIR_SUCCESS',

  FTP_CREATEDIR:        'FTP_CREATEDIR', 
  FTP_CREATEDIR_ERROR:  'FTP_CREATEDIR_ERROR',
  FTP_CREATEDIR_SUCCESS:'FTP_CREATEDIR_SUCCESS',

  FTP_REMOVEDIR:        'FTP_REMOVEDIR',
  FTP_REMOVEDIR_ERROR:  'FTP_REMOVEDIR_ERROR',
  FTP_REMOVEDIR_SUCCESS:'FTP_REMOVEDIR_SUCCESS',

  FTP_REMOVEFILE:         'FTP_REMOVEFILE',
  FTP_REMOVEFILE_ERROR:   'FTP_REMOVEFILE_ERROR',
  FTP_REMOVEFILE_SUCCESS: 'FTP_REMOVEFILE_SUCCESS'
}

type credentials = {
  host: string,
  port: number,
  username: string,
  password: string,
}

/** Ftp Connect */
export class FtpConnectAction implements Action {
  type = ActionTypes.FTP_CONNECT
  constructor(public payload: credentials) {}
}

export class FtpConnectErrorAction implements Action {
  type = ActionTypes.FTP_CONNECT_ERROR
  constructor(public payload: any) {}
}

export class FtpConnectSuccessAction implements Action {
  type = ActionTypes.FTP_CONNECT_SUCCESS
  constructor(public payload: any) {}
}

/** Ftp Disconnect */
export class FtpDisconnectAction implements Action {
  type = ActionTypes.FTP_DISCONNECT
  constructor(public payload: any) { }
}

export class FtpDisconnectErrorAction implements Action {
  type = ActionTypes.FTP_DISCONNECT_ERROR
  constructor(public payload: any) { }
}

export class FtpDisconnectSuccessAction implements Action {
  type = ActionTypes.FTP_DISCONNECT_SUCCESS
  constructor(public payload: any) { }
}

/** Ftp Read Dir */
export class FtpReadDirAction implements Action {
  type = ActionTypes.FTP_READDIR
  constructor(public payload: any) {}
}

export class FtpReadDirErrorAction implements Action {
  type = ActionTypes.FTP_READDIR_ERROR
  constructor(public payload: any) {}
}

export class FtpReadDirSuccessAction implements Action {
  type = ActionTypes.FTP_READDIR_SUCCESS
  constructor(public payload: any) {}
}

/** Ftp Create Dir */
export class FtpCreateDirAction implements Action {
  type = ActionTypes.FTP_CREATEDIR
  constructor(public payload: any) {}
}

export class FtpCreateDirErrorAction implements Action {
  type = ActionTypes.FTP_CREATEDIR_ERROR
  constructor(public payload: any) { }
}

export class FtpCreateDirSuccessAction implements Action {
  type = ActionTypes.FTP_CREATEDIR_SUCCESS
  constructor(public payload: any) { }
}

/** Ftp Remove Dir */
export class FtpRemoveDirAction implements Action {
  type = ActionTypes.FTP_REMOVEDIR
  constructor(public payload: any) {}
}

export class FtpRemoveDirErrorAction implements Action {
  type = ActionTypes.FTP_REMOVEDIR_ERROR
  constructor(public payload: any) {}
}

export class FtpRemoveDirSuccessAction implements Action {
  type = ActionTypes.FTP_REMOVEDIR_SUCCESS
  constructor(public payload: any) { }
}

/** Ftp Remove File */
export class FtpRemoveFileAction implements Action {
  type = ActionTypes.FTP_REMOVEFILE
  constructor(public payload: any) { }
}

export class FtpRemoveFileErrorAction implements Action {
  type = ActionTypes.FTP_REMOVEFILE_ERROR
  constructor(public payload: any) { }
}

export class FtpRemoveFileSuccessAction implements Action {
  type = ActionTypes.FTP_REMOVEFILE_SUCCESS
  constructor(public payload: any) { }
}

export type Actions
  = FtpConnectAction
  | FtpConnectErrorAction
  | FtpConnectSuccessAction

  | FtpDisconnectAction
  | FtpDisconnectErrorAction
  | FtpDisconnectSuccessAction

  | FtpReadDirAction
  | FtpReadDirErrorAction
  | FtpReadDirSuccessAction

  | FtpCreateDirAction
  | FtpCreateDirErrorAction
  | FtpCreateDirSuccessAction

  | FtpRemoveDirAction
  | FtpRemoveDirErrorAction
  | FtpRemoveDirSuccessAction

  | FtpRemoveFileAction
  | FtpRemoveFileErrorAction
  | FtpRemoveFileSuccessAction