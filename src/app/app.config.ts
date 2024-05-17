import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, HammerModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig = {
  providers: [
    importProvidersFrom(BrowserModule, HammerModule),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideAnimations(),
    provideRouter(appRoutes, withComponentInputBinding())
  ]
};
