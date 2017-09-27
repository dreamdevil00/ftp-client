import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { GridOptions } from 'ag-grid/main';

@Component({
  selector: 'index-content-window',
  templateUrl: './content-window.component.html'
})
export class ContentWindowComponent implements OnInit {

  @Input() private rowData: any[] = [];

  @Output() action = new EventEmitter();

  private gridOptions: GridOptions;
  private columnDefs: any[];

  constructor() {
    this.gridOptions = <GridOptions>{};

    this.columnDefs = [
      {
        headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true,
      },
      { headerName: '文件名', field: 'filename' },
      { headerName: '大小', field: 'size' },
      { headerName: '修改时间', field: 'mtime'},
    ];
  }

  ngOnInit() {
  }

  handleAction(event) {
    switch (event.type) {
      case 'IntoDir':
        const $event = event.payload;
        const isFolder = $event.data.isDirectory;
        if (isFolder) {
          this.action.emit({type: 'IntoDir', payload: $event.data.path});
        }
        break;
      case 'SelectionChanged':
        const selectedRows = this.gridOptions.api.getSelectedRows();
        if (selectedRows.length) {
          const isDirectory = selectedRows[0].isDirectory;
          const path = selectedRows[0].path;
          this.action.emit({type: 'SelectionChanged', payload: {
            isFolder: isFolder,
            path: path,
          }});
        }
        break;
      default:
        console.log('Unknown event: ', event);
    }
  }

}
