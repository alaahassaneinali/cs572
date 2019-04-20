import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataDrivenComponent } from './data-driven.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JWTInterceptorService } from './jwtinterceptor.service'

@NgModule({
  declarations: [
    AppComponent,
    DataDrivenComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JWTInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
