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

import { ButtonActionsComponent } from './components/button-actions/button-actions.component'
import { FilesListComponent } from './components/files/files-list.component'
import { IndexComponent } from './components/index.component'

import { FtpSDKModule } from './packages/ftp-sdk'

import { HumanSizePipe } from './pipes/human-size.pipe'
import { LocalTimePipe } from './pipes/local-time.pipe'


const modules = [
  FormsModule,
  RouterModule,
  AppRoutingModule,
  DreamLayoutModule,
  DreamUiModule,
  AppStoreModule,
  FtpSDKModule.forRoot(),
]

const components = [
  NotFoundComponent,
  ButtonActionsComponent,
  FilesListComponent,
  IndexComponent,
  RouterComponent,
];

const directives = [
  HumanSizePipe,
  LocalTimePipe,
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
