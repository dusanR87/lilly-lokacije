import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ViewModule} from './view/view.module';
import { FormsModule } from '@angular/forms';
import { testService } from './services/test.services';
import { HttpClientModule } from '@angular/common/http';
import { TestInterceptor } from './services/test.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    testService,
    {provide:HTTP_INTERCEPTORS, useClass:TestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
