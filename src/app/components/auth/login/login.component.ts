import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { FtpService } from '../../../services/ftp.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials = {
    host: '',
    port: 21,
    username: '',
    password: '',
  };

  constructor(
    private router: Router,
    private ftpService: FtpService,
    private NgZone: NgZone,
  ) {
    this.credentials = {
      host: '10.132.184.93',
      port: 21,
      username: 'demo',
      password: 'Passw0rd',
    };
  }

  login() {
    this.ftpService.credentials = this.credentials;
    this.ftpService.getConnection()
      .subscribe(
        (success) => {
          this.NgZone.run(() => {
            this.router.navigate(['/', 'index']);
          });
        }
      );
  }
}
