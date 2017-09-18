import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component'
import { IndexComponent } from './components/index.component'

import { SimpleLayoutComponent } from '@dream/layout'

import { RouterComponent } from './components/router/router.component'

const routes: Routes = [
  { path: '', redirectTo: 'router', pathMatch: 'full'},
  { path: '', component: SimpleLayoutComponent, children: [
    { path: '', loadChildren: '@dream/auth#AuthModule'},
    { path: 'index', component: IndexComponent },
    { path: 'router', component: RouterComponent },
    { path: 'not-found', component: NotFoundComponent },
  ] },
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
})
export class AppRoutingModule {

}