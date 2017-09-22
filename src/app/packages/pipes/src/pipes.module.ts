import { NgModule } from '@angular/core'

import { HumanSizePipe } from './directives/human-size.pipe'
import { LocalTimePipe } from './directives/local-time.pipe'

export const pipes = [
  HumanSizePipe,
  LocalTimePipe,
]

@NgModule({
  declarations: [
    ...pipes,
  ],
  exports: [
    ...pipes,
  ]
})
export class PipesModule {}