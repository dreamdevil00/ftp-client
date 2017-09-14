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
export type Actions
  = FtpConnectAction
  | FtpConnectErrorAction
  | FtpDisconnectAction
  | FtpDisconnectErrorAction
  | FtpDisconnectSuccessAction
  | FtpConnectSuccessAction
  | FtpReadDirAction
  | FtpReadDirErrorAction
  | FtpReadDirSuccessAction