import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'

import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Rx'

import * as path from 'path'

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

  private selectedRow: any

  private queue

  constructor(
    private ftpService: ftp.FtpService,
    private _ngZone: NgZone,
    private store: Store<any>,
    private ui: UiService,
  ) {
    this.subscriptions = []
    this.rowData = []
    this.currentDir = '/'
    this.selectedRow = null
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

  private _normalizePath(path: string) {
    if(path.substring(-1) !== '/') {
      path += '/'
    }
    return path
  }

  private _slugifyPath(fullPath: string) {
    fullPath = String(fullPath).replace(/\\/g, '/')
    let newPath = ''
    let spl = fullPath.split('/')
    if (spl[0].match(/[a-z]+:/i)) {
      newPath = spl.shift() + '/'
    }
    return path.normalize(newPath + spl.join('/').replace(/[:?*"><|]/g, ''))
  }

  updateSelection(selectedRow) {
    this.selectedRow = selectedRow
  }

  intoDir(path: string) {   
    path = this._normalizePath(this.currentDir) + path
    this.store.dispatch(new ftp.FtpReadDirAction(path))
  }

  upDir() {
    if (this.currentDir !== '/') {
      const path = this.currentDir.substring(0, this.currentDir.lastIndexOf('/'))
      this.store.dispatch(new ftp.FtpReadDirAction(path))
    } else {
      this.refresh()
    }
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
        let localPath = this._slugifyPath(paths[0])
        
        let serverPath = this._normalizePath(this.currentDir) + path.parse(localPath).base
        this.store.dispatch(new ftp.FtpUploadFilesAction({
          localPath: localPath,
          serverPath: serverPath,
        }))
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
    if (this.selectedRow) {
      const isFolder = this.selectedRow.isFolder
      const filePath = this._normalizePath(this.currentDir) + this.selectedRow.name
      if (isFolder) {
        _removeFolder(filePath)
      } else {
        _removeFile(filePath)
      }
    }
  }

  getFileSize() {
    this.ftpService
      .stat('/vs2015.com_chs.iso')
      .subscribe(
        (success) => {
          console.log(success)
        }
      )
  }

  handleAction(event) {
    switch(event.type) {
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
        this.upDir()
        return
      case 'IntoDir':
        this.intoDir(event.payload)
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
      case 'SelectionChanged':
        this.updateSelection(event.payload)
        return
      default:
        console.error('Unknown event:', event)
    }
  }
}