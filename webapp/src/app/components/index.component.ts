import { Component, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'

import * as ftp from '../packages/ftp-sdk'

@Component({
  selector: 'ftp-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  private filesList: any[]

  constructor(
    private ftpService: ftp.FtpService,
    private store: Store<any>,
  ) {
  }
  
  ngOnInit() {
  }

  refresh() {
    this.filesList = this.ftpService.filesList
  }

  handleAction(event) {
    switch(event.type) {
      case 'Connect':
        this.store.dispatch(new ftp.FtpConnectAction(event.payload))
        return
      case 'Disconnect':
        this.store.dispatch(new ftp.FtpDisconnectAction())
        return
      case 'Refresh':
        this.refresh()
        return
      case 'Return':
      case 'CreateDir':
      case 'UploadFile':
      case 'UploadFiles':
      default:
        console.error('Unknown event:', event)
    }
  }
}