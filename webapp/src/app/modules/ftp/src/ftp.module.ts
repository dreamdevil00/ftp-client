import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { PipesModule } from '../../../packages/pipes'

import { ButtonActionsComponent } from './components/button-actions/button-actions.component'
import { FilesListComponent } from './components/files/files-list.component'
import { IndexComponent } from './components/index.component'

const components = [
  ButtonActionsComponent,
  FilesListComponent,
  IndexComponent,
]

@NgModule({
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
  ]
})
export class FtpModule {

}