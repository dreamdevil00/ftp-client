import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid/main';

@Component({
  selector: 'index-transfer-window',
  templateUrl: './transfer-window.component.html',
  styleUrls: ['./transfer-window.component.css']
})
export class TransferWindowComponent {

  @Input() queue: any[];
  @Output() action = new EventEmitter();

  // private rowData: any[];
  columnDefs: any[];

  gridOptions = <GridOptions>{};
  constructor() {
    this.createColumnDefs();
  }

  createColumnDefs() {
    this.columnDefs = [
      {
        headerName: '#', width: 30, checkboxSelection: true,
        suppressMenu: true, pinned: true,
      },
      { headerName: '本地路径', field: 'localPath' },
      { headerName: '服务器路径', field: 'serverPath' },
      { headerName: '文件大小', field: 'size' },
      { headerName: '状态', field: 'status'},
      {
        headerName: '上传进度',
        field: 'uploaded',
        width: 120,
      },
    ];
  }

  handleAction(event) {
    this.action.emit(event);
  }
}
