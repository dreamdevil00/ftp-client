import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import * as path from 'path';

import { UiService } from '../../packages/ui';
import { IpcRendererService } from '../../services/ipc-renderer.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {

  private currentDir: string;
  public queue: any[];

  public filenames: any[] = ['placeholder'];

  rowData: any[];

  private selectedRow: any;

  constructor(
    private _ngZone: NgZone,
    private _ipcRenderer: IpcRendererService,
    private ui: UiService,
  ) {
    this.rowData = [];
    this.currentDir = '/';
    this.selectedRow = null;
  }

  private _readCurDir() {
    this._ipcRenderer.api('readDir', this.currentDir)
      .then((res: string[]) => {
        this._ngZone.run(() => {
          this.rowData = res;
        });
      });
  }

  ngOnInit() {
    this._readCurDir();
    this._ipcRenderer.on('transfer-queue-add', (e: Electron.Event, entries) => {
      this._ngZone.run(() => {
        this.queue = entries;
      });
    });
  }

  ngOnDestroy() {
  }

  refresh() {
    this._readCurDir();
  }

  private _slugifyPath(fullPath: string) {
    fullPath = String(fullPath).replace(/\\/g, '/');
    let newPath = '';
    const spl = fullPath.split('/');
    if (spl[0].match(/[a-z]+:/i)) {
      newPath = spl.shift() + '/';
    }
    return path.normalize(newPath + spl.join('/').replace(/[:?*"><|]/g, ''));
  }

  updateSelection(selectedRow) {
    this.selectedRow = selectedRow;
  }

  intoDir(_path: string) {
    this._ipcRenderer.api('readDir', _path)
      .then((res: string[]) => {
        this._ngZone.run(() => {
          this.rowData = res;
          this.currentDir = _path;
        });
      });
  }

  upDir() {
    if (this.currentDir !== '/') {
      const _path = this.currentDir.substring(0, this.currentDir.lastIndexOf('/'));
      this.intoDir(_path);
    } else {
      this.refresh();
    }
  }

  selectFiles() {
    this._ipcRenderer.api('selectFile', this.currentDir)
      .then(() => {

      });
  }

  selectFolder() {
    this._ipcRenderer.api('selectFolder', this.currentDir)
      .then(() => {

      });
  }

  createFolder() {
    const successCb = (res) => {
      let path = null;
      if (this.currentDir === '/') {
        path = this.currentDir + res;
      } else {
        path = this.currentDir + '/' + res;
      }
      this._ipcRenderer.api('createDir', path)
        .then(() => {
          this.refresh();
        });
    };
    this.ui.alertInput({ title: '请输入目录名'}, successCb, () => {});
  }


  remove() {
  }

  startAll() {
    // this._ipcRenderer.api('startAll');
  }

  handleAction(event) {
    switch (event.type) {
      case 'Disconnect':
        return;
      case 'Remove':
        this.remove();
        return;
      case 'Refresh':
        this.refresh();
        return;
      case 'Return':
        this.upDir();
        return;
      case 'IntoDir':
        this.intoDir(event.payload);
        return;
      case 'CreateDir':
        this.createFolder();
        return;
      case 'UploadFiles':
        this.selectFiles();
        return;
      case 'UploadFolder':
        this.selectFolder();
        return;
      case 'SelectionChanged':
        this.updateSelection(event.payload);
        return;
      case 'StartAll':
        this.startAll();
        return;
      default:
        console.error('Unknown event:', event);
    }
  }
}
