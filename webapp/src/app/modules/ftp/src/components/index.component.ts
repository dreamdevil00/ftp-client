import { Component, OnInit, OnDestroy } from '@angular/core'

import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Rx'

import * as ftp from '../../../../packages/ftp-sdk'

@Component({
  selector: 'ftp-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {

  private filesList: any[]
  private subscriptions: Subscription[] = []

  constructor(
    private ftpService: ftp.FtpService,
    private store: Store<any>,
  ) {
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe()
    })
  }

  refresh() {
    const self = this
    this.subscriptions.push(
      this.store
        .select('ftp')
        .subscribe((res) => {
          this.filesList = res.filesList
        })
    )
  }

  handleAction(event) {
    switch(event.type) {
      case 'Connect':
        this.store.dispatch(new ftp.FtpReadDirAction('.'))
        return
      case 'Disconnect':
        this.store.dispatch(new ftp.FtpDisconnectAction({}))
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