import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './components/login/login.component'
import { LogoutComponent } from './components/logout/logout.component'

export const routes: Routes = [{
  path: '',
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}