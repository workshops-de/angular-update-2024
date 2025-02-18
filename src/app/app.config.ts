import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

export const appConfig = {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, HammerModule, AppRoutingModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations()
  ]
};
