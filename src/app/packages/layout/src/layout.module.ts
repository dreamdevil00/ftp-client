import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { FooterComponent } from './components/footer/footer.component'

import { SimpleLayoutComponent } from './components/layout/simple-layout.component'

export const components: any[] = [
  SimpleLayoutComponent,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
})
export class DreamLayoutModule {}