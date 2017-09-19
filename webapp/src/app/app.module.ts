import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { AppRoutingModule } from './app-routing.module'
import { AppStoreModule } from './app.store'
import { DreamLayoutModule } from './packages/layout'
import { DreamUiModule } from './packages/ui'

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component'
import { RouterComponent } from './components/router/router.component'

import { FtpModule } from './modules/ftp'
import { FtpSDKModule } from './packages/ftp-sdk'

import { PipesModule } from './packages/pipes'


const modules = [
  FormsModule,
  RouterModule,
  AppRoutingModule,
  DreamLayoutModule,
  DreamUiModule,
  PipesModule,
  FtpModule,
  AppStoreModule,
  FtpSDKModule.forRoot(),
]

const components = [
  NotFoundComponent,
  RouterComponent,
];

const directives = [
]

@NgModule({
  declarations: [
    AppComponent,
    ...components,
    ...directives,
  ],
  imports: [
    BrowserModule,
    modules,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
