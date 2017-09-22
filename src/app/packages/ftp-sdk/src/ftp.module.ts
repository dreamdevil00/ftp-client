import { NgModule, ModuleWithProviders } from '@angular/core'

import { FtpService } from './ftp.service'

@NgModule({
})
export class FtpSDKModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FtpSDKModule,
      providers: [
        FtpService,
      ]
    }
  }
}