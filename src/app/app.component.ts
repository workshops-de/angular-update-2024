import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavigationComponent } from './common-components/main-navigation/main-navigation.component';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, MainNavigationComponent]
})
export class AppComponent {}
