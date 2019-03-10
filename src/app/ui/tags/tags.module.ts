import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterComponent } from './counter/counter.component';

@NgModule({
  imports: [CommonModule],
  declarations: [

    CounterComponent

  ],
  exports: [

    // Counter
    CounterComponent
  ]
})
export class TagsModule {}
