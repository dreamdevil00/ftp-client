import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { UiLogoComponent } from './components/logo/logo.component'
import { UiMessageComponent } from './components/message/message.component'

import { UiService } from './services/ui.service'

const components = [
  UiLogoComponent,
  UiMessageComponent,
]

const modules = [
  CommonModule,
  FormsModule,
  NgbModule.forRoot(),
]

const providers = [
  UiService,
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
  ],
  providers: [
    ...providers,
  ]
})
export class DreamUiModule {}