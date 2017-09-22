import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component'
import { IndexComponent } from './modules/ftp'

import { SimpleLayoutComponent } from './packages/layout'

import { RouterComponent } from './components/router/router.component'

const routes: Routes = [
  { path: '', redirectTo: 'router', pathMatch: 'full'},
  { path: '', component: SimpleLayoutComponent, children: [
    { path: '', loadChildren: './modules/auth#AuthModule'},
    { path: 'router', component: RouterComponent },
    { path: 'not-found', component: NotFoundComponent },
  ] },
  { path: 'main', component: IndexComponent },
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, useHash: true}),
  ],
})
export class AppRoutingModule {

}