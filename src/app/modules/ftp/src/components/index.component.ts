import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'

import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Rx'

import * as ftp from '../../../../packages/ftp-sdk'

import { remote } from 'electron'

const dialog = remote.dialog

@Component({
  selector: 'ftp-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {

  private currentDir: string

  private rowData: any[]
  private subscriptions: Subscription[]

  constructor(
    private ftpService: ftp.FtpService,
    private _ngZone: NgZone,
    private store: Store<any>,
  ) {
    this.subscriptions = []
    this.rowData = []
    this.currentDir = '/'
  }
  
  ngOnInit() {
    this.subscriptions.push(
      this.store
        .select('ftp')
        .subscribe(
          (res) => {
            this._ngZone.run(() => {
              this.rowData = res.filesList
              this.currentDir = res.currentDir
            })
          }
        )
    ) 
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe()
    })
  }

  refresh() {
    this.store.dispatch(new ftp.FtpReadDirAction(this.currentDir))
  }

  selectFiles() {
    dialog.showOpenDialog({
      title: '选择文件',
      properties: ["openFile", "multiSelections"],
    }, (paths) => {
      if (typeof paths === 'undefined') {
        console.log('No file selected');
        return;
      } else {
        console.log(paths)
      }
    })
  }

  selectFolder() {
    dialog.showOpenDialog({
      title: '选择文件夹',
      properties: ["openDirectory", "multiSelections"],
    }, (paths) => {
      if (typeof paths === 'undefined') {
        console.log('No folder selected');
        return;
      } else {
        console.log(paths)
      }
    })
  }

  createFolder() {
    const path = '/result'
    this.store.dispatch(new ftp.FtpCreateDirAction(path))
    this.refresh()
  }

  remove() {
    this.removeFolder()
    this.refresh()
  }

  removeFolder() {
    const path = '/result'
    this.store.dispatch(new ftp.FtpRemoveDirAction(path))
  }

  handleAction(event) {
    switch(event.type) {
      case 'Connect':
        this.store.dispatch(new ftp.FtpReadDirAction('.'))
        return
      case 'Disconnect':
        this.store.dispatch(new ftp.FtpDisconnectAction({}))
        return
      case 'Remove':
        this.remove()
        return
      case 'Refresh':
        this.refresh()
        return
      case 'Return':
        return
      case 'CreateDir':
        this.createFolder()
        return
      case 'UploadFiles':
        this.selectFiles()
        return
      case 'UploadFolder':
        this.selectFolder()
        return
      default:
        console.error('Unknown event:', event)
    }
  }
}