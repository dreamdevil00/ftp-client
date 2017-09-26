import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core'

import { GridOptions } from 'ag-grid/main'

@Component({
  selector: 'content-window',
  templateUrl: './content-window.component.html'
})
export class ContentWindowComponent implements OnInit {

  @Input() private rowData: any[] = []

  @Output() action = new EventEmitter()

  private gridOptions: GridOptions
  private columnDefs: any[]

  constructor() {
    this.gridOptions = <GridOptions>{}

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
  }

  handleAction(event) {
    switch (event.type) {
      case 'IntoDir':
        let $event = event.payload
        let isFolder = $event.data.type === 1
        if (isFolder) {
          this.action.emit({type: 'IntoDir', payload: $event.data.name})
        }
        break
      case 'SelectionChanged':
        let selectedRows = this.gridOptions.api.getSelectedRows()
        if (selectedRows.length) {
          let isFolder = selectedRows[0].type === 1
          let name = selectedRows[0].name
          this.action.emit({type: 'SelectionChanged', payload: {
            isFolder: isFolder,
            name: name
          }})
        }
        break
      default:
        console.log('Unknown event: ', event)
    }
  }

}