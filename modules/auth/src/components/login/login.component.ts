import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store'

import * as auth from '../../../state/auth'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

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
      .select('auth')
      .subscribe((res: any) => {
        if (res.development === true) {
          this.credentials.host = '10.132.184.93'
          this.credentials.port = 21
          this.credentials.username = 'demo'
          this.credentials.password = 'Passw0rd'
        }
      })
  }

  login() {
    
  }
}