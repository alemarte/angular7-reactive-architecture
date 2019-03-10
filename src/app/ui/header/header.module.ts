import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from '@angular/router';

const routes = [{path: '', children: []}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
