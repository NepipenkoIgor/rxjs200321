import { asap, async, asyncScheduler, combineLatest, from, of, queueScheduler, Subject } from "rxjs";
import { map, observeOn, subscribeOn, take, tap } from "rxjs/operators";

// queue , asap, async ,  animationFrame
// console.log('start');
// setTimeout(() => console.log('time1'));
// setTimeout(() => console.log('time2'));
// Promise.resolve().then(() => console.log('p1'));
// Promise.resolve().then(() => console.log('p2'));
// of(1, 2, 3, 4, 5, async ).subscribe((v) => console.log(v));
// console.log('end');

//
// const sequence1$ = from([1, 2], asap);
// const sequence2$ = of(10);
//
// const sequence = combineLatest([sequence1$, sequence2$])
//     .pipe(map(([v1, v2]) => v1 + v2))
//
// sequence.subscribe((v) => {
//     console.log(v);
// })

// console.log('start');
// of(1, 2, 3, 4, 5, 6, 7)
//     .pipe(
//         tap((v) => {
//             console.log('tap =>', v);
//         }),
//         observeOn(asyncScheduler),
//         map((v) => v * 2),
//     )
//     .subscribe((v) => console.log(v))
// console.log('end');


let count = 0;
const signal: Subject<number> = new Subject();
const calc = (count: number) => console.log('do something');
console.log('Start');
signal.pipe(observeOn(queueScheduler), take(1600))
    .subscribe((v: number) => {
        calc(v);
        signal.next(count++);
    })
signal.next(count++);
console.log('End');
