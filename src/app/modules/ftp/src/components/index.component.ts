import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'
import { GridOptions } from 'ag-grid/main'

import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Rx'

import * as ftp from '../../../../packages/ftp-sdk'
import { UiService } from '../../../../packages/ui'

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

  private selectedFiles: any[]
  private columnDefs

  private gridOptions: GridOptions

  constructor(
    private ftpService: ftp.FtpService,
    private _ngZone: NgZone,
    private store: Store<any>,
    private ui: UiService,
  ) {
    this.subscriptions = []
    this.rowData = []
    this.currentDir = '/'

    this.gridOptions = <GridOptions>{}

    this.selectedFiles = []

    this.columnDefs = [
      {
        headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true,
      },
      { headerName: '文件', field: 'name' },
      { headerName: '大小', field: 'size' },
    ]
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

  private _normalizePath(path: string) {
    if(path.substring(-1) !== '/') {
      path += '/'
    }
    return path
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
    const successCb = (res) => {
      const path = this._normalizePath(this.currentDir) + res
      this.store.dispatch(new ftp.FtpCreateDirAction({
        currentDir: this.currentDir,
        path: path
      }))
    }
    this.ui.alertInput({ title: '请输入目录名'}, successCb, () => {})
  }


  remove() {
    const _removeFolder = (path) => {
      this.store.dispatch(new ftp.FtpRemoveDirAction({
        currentDir: this.currentDir,
        path: path
      }))
    }
    const _removeFile = (path) => {
      this.store.dispatch(new ftp.FtpRemoveFileAction({
        currentDir: this.currentDir,
        path: path
      }))
    }
    const selectedRows = this.gridOptions.api.getSelectedRows()
    if (selectedRows.length) {
      const isFolder = selectedRows[0].type === 1
      const filePath = this._normalizePath(this.currentDir) + selectedRows[0].name
      if (isFolder) {
        _removeFolder(filePath)
      } else {
        _removeFile(filePath)
      }
    }
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