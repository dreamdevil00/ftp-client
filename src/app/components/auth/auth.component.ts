import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store'

import * as ftp from '../../state/ftp.actions'

@Component({
  selector: 'ftp-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  @Output() action = new EventEmitter()

  private settings: any

  private credentials = {
    host: '',
    port: 21,
    username: '',
    password: '',
  }

  constructor(
    private store: Store<any>,
  ) {
    this.store
      .select('app')
      .subscribe((res: any) => {
        this.settings = res.settings
        if (this.settings.nodeEnv === 'development') {
          this.credentials.host = '10.132.184.93'
          this.credentials.port = 21
          this.credentials.username = 'demo'
          this.credentials.password = 'Passw0rd'
        }
      })
  }

  handleAction(event) {
    this.action.emit(event)
  }
}