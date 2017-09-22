import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { UiLogoComponent } from './components/logo/logo.component'
import { UiMessageComponent } from './components/message/message.component'

const components = [
  UiLogoComponent,
  UiMessageComponent,
]

const modules = [
  CommonModule,
  FormsModule,
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules,
  ],
  exports: [
    ...components,
  ]
})
export class DreamUiModule {}