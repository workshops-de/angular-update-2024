import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { BrowserModule, HammerModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, HammerModule, AppRoutingModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.log(err));
