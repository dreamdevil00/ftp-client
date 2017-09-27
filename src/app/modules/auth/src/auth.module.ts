import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { DreamUiModule } from '../../../packages/ui'
import { AuthRoutingModule } from './auth-routing.module'

import { LoginComponent } from './components/login/login.component'
import { LogoutComponent } from './components/logout/logout.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DreamUiModule,

    AuthRoutingModule,
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
  ],
  providers: [
  ]
})
export class AuthModule {}