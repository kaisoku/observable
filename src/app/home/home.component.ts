import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, count, filter, interval, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private myInterval: Subscription;
  constructor() {}
  ngOnDestroy() {
    this.myInterval.unsubscribe();
  }

  ngOnInit() {
    /* this.myInterval = interval(1000).subscribe((count) => console.log(count)); */
    const customObservable: Observable<number> = new Observable(
      (subscriber) => {
        let count = 0;
        setInterval(() => {
          subscriber.next(count);
          if (count === 2) {
            subscriber.complete();
          }
          if (count > 3) {
            subscriber.error(new Error('count has reach the limit'));
          }
          count++;
        }, 1000);
      }
    );

    this.myInterval = customObservable
      .pipe(
        filter((data: number) => {
          return data > 0;
        }),
        map((data: number) => {
          return 'Round: ' + (data + 1);
        })
      )
      .subscribe({
        next: (count) => console.log(count),
        error: (error) => console.error(error.message),
        complete: () => {
          console.log('We have complete the count');
        },
      });
  }
}
