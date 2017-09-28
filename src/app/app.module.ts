import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { DreamLayoutModule } from './packages/layout';
import { DreamUiModule } from './packages/ui';

import { AgGridModule } from 'ag-grid-angular/main'

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/auth/login/login.component';

import { ActionButtonsComponent } from './components/index/action-buttons/action-buttons.component';
import { ContentWindowComponent } from './components/index/content-window/content-window.component';
import { TransferWindowComponent } from './components/index/transfer-window/transfer-window.component';
import { IndexComponent } from './components/index/index.component';

import { FtpService } from './services/ftp.service';


const modules = [
  FormsModule,
  RouterModule,
  AppRoutingModule,
  DreamLayoutModule,
  DreamUiModule,

  AgGridModule.withComponents([])
];

const components = [
  NotFoundComponent,
  LoginComponent,

  ActionButtonsComponent,
  ContentWindowComponent,
  TransferWindowComponent,
  IndexComponent,
];

const directives = [
];

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
  providers: [
    FtpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
