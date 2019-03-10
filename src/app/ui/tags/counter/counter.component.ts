import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input() timestamp: number;

  seconds$;

  ngOnInit(): void {
    const seconds = Math.round((new Date().getTime() - this.timestamp) / 1000);
    this.seconds$ = interval(1000).pipe(map(value => seconds + value));
  }

}
