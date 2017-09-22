import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'content-window',
  templateUrl: './content-window.component.html'
})
export class ContentWindowComponent implements OnInit {

  @Input() private rowData: any[]

  constructor() {
    this.rowData = []
  }

  ngOnInit() {
  }

}