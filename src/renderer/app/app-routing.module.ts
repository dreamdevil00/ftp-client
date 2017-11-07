import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/auth/login/login.component';

import { IndexComponent } from './components/index/index.component';

import { SimpleLayoutComponent } from './packages/layout'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '', component: SimpleLayoutComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'index', component: IndexComponent },
    { path: 'not-found', component: NotFoundComponent },
  ] },
  { path: 'index', component: IndexComponent },
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, useHash: true}),
  ],
})
export class AppRoutingModule {

}
