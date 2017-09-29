import { Component, OnInit } from '@angular/core'

@Component({
  templateUrl: './indicator.component.html'
})

export class IndicatorComponent implements OnInit {

  private currentStyles: {}

  ngOnInit() {
    this.hide()
  }

  show() {
    this.currentStyles = {

    }
  }

  hide() {
    this.currentStyles = {

    }
  }
}