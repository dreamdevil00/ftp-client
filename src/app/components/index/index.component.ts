import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import * as path from 'path';

import { UiService } from '../../packages/ui';
import { FtpService } from '../../services/ftp.service';

import { remote } from 'electron';
const dialog = remote.dialog;


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {

  private currentDir: string;

  rowData: any[];
  private subscriptions: Subscription[];

  private selectedRow: any;

  constructor(
    private ftpService: FtpService,
    private _ngZone: NgZone,
    private ui: UiService,
  ) {
    this.subscriptions = [];
    this.rowData = [];
    this.currentDir = '/';
    this.selectedRow = null;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  refresh() {
  }

  private _normalizePath(path: string) {
    if (path.substring(-1) !== '/') {
      path += '/';
    }
    return path;
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

  intoDir(path: string) {
    path = this._normalizePath(this.currentDir) + path;
  }

  upDir() {
    if (this.currentDir !== '/') {
      const path = this.currentDir.substring(0, this.currentDir.lastIndexOf('/'));
    } else {
      this.refresh();
    }
  }

  selectFiles() {
    dialog.showOpenDialog({
      title: '选择文件',
      properties: ['openFile', 'multiSelections'],
    }, (paths) => {
      if (typeof paths === 'undefined') {
        console.log('No file selected');
        return;
      } else {
        const localPath = this._slugifyPath(paths[0]);

        const serverPath = this._normalizePath(this.currentDir) + path.parse(localPath).base;
      }
    });
  }

  selectFolder() {
    dialog.showOpenDialog({
      title: '选择文件夹',
      properties: ['openDirectory', 'multiSelections'],
    }, (paths) => {
      if (typeof paths === 'undefined') {
        console.log('No folder selected');
        return;
      } else {
        console.log(paths);
      }
    });
  }

  createFolder() {
    const successCb = (res) => {
      const path = this._normalizePath(this.currentDir) + res;
    };
    this.ui.alertInput({ title: '请输入目录名'}, successCb, () => {});
  }


  remove() {
    const _removeFolder = (path) => {
    };
    const _removeFile = (path) => {
    };
    if (this.selectedRow) {
      const isFolder = this.selectedRow.isFolder;
      const filePath = this._normalizePath(this.currentDir) + this.selectedRow.name;
      if (isFolder) {
        _removeFolder(filePath);
      } else {
        _removeFile(filePath);
      }
    }
  }

  getFileSize() {
    this.ftpService
      .stat('/vs2015.com_chs.iso')
      .subscribe(
        (success) => {
          console.log(success);
        }
      );
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
      default:
        console.error('Unknown event:', event);
    }
  }
}
