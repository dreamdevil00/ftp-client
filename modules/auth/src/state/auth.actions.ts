import { Action } from '@ngrx/store'

export const ActionTypes = {
  AUTH_LOGIN:           'AUTH_LOGIN',
  AUTH_LOGIN_ERROR:     'AUTH_LOGIN_ERROR',
  AUTH_LOGIN_SUCCESS:   'AUTH_LOGIN_SUCCESS',
  AUTH_LOGOUT:          'AUTH_LOGOUT',
  AUTH_LOGOUT_ERROR:    'AUTH_LOGOUT_ERROR',
  AUTH_LOGOUT_SUCCESS:  'AUTH_LOGOUT_SUCCESS'
}

type credentials = {
  host: string,
  port: number,
  username: string,
  password: string,
}

/** LOGIN */
export class AuthLoginAction implements Action {
  type = ActionTypes.AUTH_LOGIN
  constructor(public payload: credentials) {}
}

export class AuthLoginErrorAction implements Action {
  type = ActionTypes.AUTH_LOGIN_ERROR
  constructor(public payload: any) { }
}

export class AuthLoginSuccessAction implements Action {
  type = ActionTypes.AUTH_LOGIN_SUCCESS
  constructor(public payload: any) { }
}

/** LOGOUT */
export class AuthLogoutAction implements Action {
  type = ActionTypes.AUTH_LOGOUT
  constructor(public payload: any = {}) { }
}
export class AuthLogoutErrorAction implements Action {
  type = ActionTypes.AUTH_LOGOUT_ERROR
  constructor(public payload: any = {}) { }
}
export class AuthLogoutSuccessAction implements Action {
  type = ActionTypes.AUTH_LOGOUT_SUCCESS
  constructor(public payload: any = {}) { }
}

export type Actions
  = AuthLoginAction
  | AuthLoginErrorAction
  | AuthLoginSuccessAction
  | AuthLogoutAction
  | AuthLogoutErrorAction
  | AuthLogoutSuccessAction