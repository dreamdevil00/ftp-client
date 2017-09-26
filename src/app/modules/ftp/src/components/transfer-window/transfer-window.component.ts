import { Component, Input } from '@angular/core'
import { GridOptions } from 'ag-grid/main'

@Component({
  selector: 'transfer-window',
  templateUrl: './transfer-window.component.html',
  styleUrls: ['./transfer-window.component.css']
})
export class TransferWindowComponent {

  @Input() private queue: any[]

  private rowData: any[]
  private columnDefs: any[]

  private gridOptions = <GridOptions>{}
  constructor() {
    this.createColumnDefs()
    this.createRowData()
  }

  createColumnDefs() {
    this.columnDefs = [
      {
        headerName: '#', width: 30, checkboxSelection: true,
        suppressMenu: true, pinned: true,
      },
      { headerName: '本地路径', field: 'localPath' },
      { headerName: '服务器路径', field: 'serverPath' },
      { headerName: '文件大小', field: 'fileSize' },
      { 
        headerName: '上传进度',
        field: 'uploaded',
        width: 120,
        cellRenderer: percentCellRenderer,
      },
    ]
  }

  createRowData() {
    this.rowData = [
      { 
        localPath: 'E:/开发/环境搭建/strongloop/vs2015/vs2015.com_chs.iso',
        serverPath: '/vs2015.com_chs.iso',
        fileSize: '3919844000',
        uploaded: '30',
      }
    ]
  }




}

function percentCellRenderer(params) {
  const value = params.value;

  const eDivPercentBar = document.createElement('div');
  eDivPercentBar.className = 'dev-percent-bar'
  eDivPercentBar.style.width = value + '%'
  if (value < 20) {
    eDivPercentBar.style.backgroundColor = 'red'
  } else if (value < 60) {
    eDivPercentBar.style.backgroundColor = '#ff9900'
  } else {
    eDivPercentBar.style.backgroundColor = '#00A000'
  }

  const eValue = document.createElement('div')
  eValue.className = 'div-percent-value'
  eValue.innerHTML = value + '%'

  const eOuterDiv = document.createElement('div')
  eOuterDiv.className = 'div-outer-div'
  eOuterDiv.appendChild(eValue)
  eOuterDiv.appendChild(eDivPercentBar)

  return eOuterDiv
}