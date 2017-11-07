import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IpcRendererService } from '../../../services/ipc-renderer.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  credentials = {
    host: '10.132.184.93',
    port: 21,
    username: 'demo',
    password: 'Password',
  };

  constructor(
    private router: Router,
    private ipcRenderer: IpcRendererService,
    private NgZone: NgZone,
  ) {
  }

  ngOnInit() {
    this.ipcRenderer.api('getSetting', null)
      .then((setting: any) => {
        this.NgZone.run(() => {
          this.credentials.host = setting && setting.host || this.credentials.host;
          this.credentials.port = setting && setting.port || this.credentials.port;
          this.credentials.username = setting && setting.user || this.credentials.username;
          this.credentials.password = setting && setting.password || this.credentials.password;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  login() {
    this.ipcRenderer.api('saveSetting', this.credentials);
  }
}
