import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component'
import { IndexComponent } from './components/index.component'

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
})
export class AppRoutingModule {

}