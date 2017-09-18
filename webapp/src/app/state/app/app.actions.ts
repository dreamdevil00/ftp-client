import { Action } from '@ngrx/store'

export const ActionTypes = {
  APP_REDIRECT_INDEX:   'APP_REDIRECT_INDEX',
  APP_REDIRECT_LOGIN:   'APP_REDIRECT_LOGIN',
  APP_REDIRECT_ROUTER:  'APP_REDIRECT_ROUTER'
}

export class AppRedirectIndexAction implements Action {
  type = ActionTypes.APP_REDIRECT_INDEX
  constructor(public payload: any) {}
}

export class AppRedirectLoginAction implements Action {
  type = ActionTypes.APP_REDIRECT_LOGIN
  constructor(public payload: any) {}
}

export class AppRedirectRouterAction implements Action {
  type = ActionTypes.APP_REDIRECT_ROUTER
  constructor(public payload: any) {}
}

export type Actions
  = AppRedirectIndexAction
  | AppRedirectLoginAction
  | AppRedirectRouterAction