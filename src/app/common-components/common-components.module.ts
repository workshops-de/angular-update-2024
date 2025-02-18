import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';

@NgModule({
    exports: [MainNavigationComponent],
    imports: [
        CommonModule,
        RouterModule,
        MainNavigationComponent
    ]
})
export class CommonComponentsModule {}
