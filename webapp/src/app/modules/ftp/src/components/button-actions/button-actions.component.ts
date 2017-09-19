import { Component, Output, EventEmitter } from '@angular/core'


@Component({
  selector: 'ftp-button-actions',
  templateUrl: './button-actions.component.html',
  styles: [`
  `]
})
export class ButtonActionsComponent {

  @Output() action = new EventEmitter()

  handleAction(event) {
    this.action.emit(event)
  }
}