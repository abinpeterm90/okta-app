import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Okta Guard and Service
import { OktaAuthGuard } from './app.guard';
import { OktaAuthService } from './app.service';
import { CallbackComponent } from './callback.component';
import { ProtectedComponent } from './protected.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    OktaAuthGuard,
    OktaAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
