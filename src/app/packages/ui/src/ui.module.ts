import { NgModule } from '@angular/core'

import { UiLogoComponent } from './components/logo/logo.component'

const components = [
  UiLogoComponent,
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
  ],
  exports: [
    ...components,
  ]
})
export class DreamUiModule {}