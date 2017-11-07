import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IpcRendererService } from '../../../services/ipc-renderer.service';
import { UiService } from '../../../packages/ui/src/services/ui.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  credentials = {
    host: '10.132.184.93',
    port: 21,
    user: 'demo',
    password: 'Passw0rd',
  };

  constructor(
    private router: Router,
    private ipcRenderer: IpcRendererService,
    private ui: UiService,
    private NgZone: NgZone,
  ) {
  }

  ngOnInit() {
    this.ipcRenderer.api('getSetting', null)
      .then((setting: any) => {
        this.NgZone.run(() => {
          this.credentials.host = setting && setting.host || this.credentials.host;
          this.credentials.port = setting && setting.port || this.credentials.port;
          this.credentials.user = setting && setting.user || this.credentials.user;
          this.credentials.password = setting && setting.password || this.credentials.password;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  login() {
    this.ipcRenderer.api('saveSetting', this.credentials);
    this.ipcRenderer.api('login', this.credentials)
      .then(() => {
        this.NgZone.run(() => {
          this.router.navigate(['/', 'index']);
        });
      })
      .catch(error => {
        this.ui.alertError({
          title: '发生错误',
          text: error.message,
        });
      });
  }
}
