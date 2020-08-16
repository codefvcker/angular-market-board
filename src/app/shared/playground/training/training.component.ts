// import {
//   Observable,
//   timer,
//   EMPTY,
//   interval,
//   of,
//   Event,
//   Subject,
//   BehaviorSubject,
// } from 'rxjs';
// import { TrainingGeoService } from './../services/training-geo.service';
// import {
//   Component,
//   OnInit,
//   InjectionToken,
//   Inject,
//   inject,
//   ViewChild,
//   ElementRef,
//   AfterViewInit,
// } from '@angular/core';
// import { map, switchMap, scan, startWith, mapTo } from 'rxjs/operators';

// const MY_NAVIGATOR = new InjectionToken<Navigator>('try to do nav token', {
//   providedIn: 'root',
//   factory: () => navigator,
// });

// const myInjectToken = new InjectionToken<Geolocation>('dish', {
//   factory: () => inject(MY_NAVIGATOR).geolocation,
// });
// const mySecondInjToken = new InjectionToken<boolean>('idk', {
//   factory: () => !!inject(myInjectToken),
// });

// const myFirstInjTokenAsBool = new InjectionToken<string>('check it', {
//   factory: () => inject(mySecondInjToken).toString().toUpperCase(),
// });

// @Component({
//   selector: 'app-training',
//   templateUrl: './training.component.html',
//   styleUrls: ['./training.component.scss'],
// })
// export class TrainingComponent implements OnInit {
//   @ViewChild('startStream') startBtn: ElementRef;

//   constructor(private geo: TrainingGeoService) {}

//   public subj: BehaviorSubject<number> = new BehaviorSubject(0);

//   startCounter() {
//     this.subj.next(1);
//     this.subj.subscribe(console.log);
//   }

//   ////////////////////////

//   // counter$ = timer(0, 1000);
//   // toggle$: Observable<any> = fromEvent(document, 'click').pipe(
//   //   scan((acc) => !acc, true),
//   //   startWith(true)
//   // );

//   // startCounter() {
//   //   this.toggle$
//   //     .pipe(switchMap((res) => (res ? this.counter$ : this.toggle$)))
//   //     .subscribe((data) => console.log(data));
//   // }

//   ///////////////////// (bad solution)

//   // isPaused: boolean = false;
//   // counter: number;

//   // pauseHandler() {
//   //   this.isPaused = !this.isPaused;
//   // }

//   // startCounter() {
//   //   interval(1000)
//   //     .pipe(
//   //       scan((acc, n) => {
//   //         this.isPaused ? acc + 0 : acc++;
//   //         return acc;
//   //       })
//   //     )
//   //     .subscribe((count) => (this.counter = count));
//   // }

//   //////////////////////

//   ngOnInit(): void {
//     console.log('object');
//   }
// }
