import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'ws-main-navigation',
    templateUrl: './main-navigation.component.html',
    imports: [RouterLink, RouterLinkActive]
})
export class MainNavigationComponent {
}
