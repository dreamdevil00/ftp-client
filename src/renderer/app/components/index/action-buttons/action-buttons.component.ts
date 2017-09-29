import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'index-action-buttons',
  templateUrl: './action-buttons.component.html',
  styles: [`
  `]
})
export class ActionButtonsComponent {

  @Output() action = new EventEmitter();

  handleAction(event) {
    this.action.emit(event);
  }
}
