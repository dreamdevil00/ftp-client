import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-message',
  templateUrl: './message.component.html',
  styles: [`
    .d-100vh-va-middle {
      display: table-cell;
      height: 100vh;
      vertical-align: middle;
    }
    .ml_25 {
      margin-left: 25%;
    }
  `]
})
export class UiMessageComponent {

  @Input() public message: string = null
}