import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';

@NgModule({
  declarations: [MainNavigationComponent],
  exports: [MainNavigationComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CommonComponentsModule {}
