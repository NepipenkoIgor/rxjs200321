import { interval, Observable, of, Subscriber, pipe } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

function doNothing<T>(source: Observable<T>) {
    return source;
}

function toText<T>(source: Observable<T>) {
    return new Observable((subscriber: Subscriber<any>) => {
        subscriber.next('RxJS is awesome');
        subscriber.complete();
    })
}

// function double(source: Observable<number>) {
//     return new Observable((subscriber: Subscriber<any>) => {
//         source.subscribe((v) => {
//             subscriber.next(v * 2);
//         }, (err) => {
//             subscriber.error(err), () => {
//                 subscriber.complete();
//             }
//         })
//     })
// }

const o$ = new Observable();
o$.source = interval(1000);
o$.operator = {
    call(subscriber: Subscriber<unknown>, source: any): void {
        source.subscribe(subscriber);
    }
}

class DoubleSubscriber extends Subscriber<number> {
    next(value: number) {
        super.next(value * 2);
    }
}

//
// of(1, 2, 3, 4).subscribe(new DoubleSubscriber((v) => {
//     console.log(v);
// }))

// function double(source: Observable<number>) {
//     const o$ = new Observable();
//     o$.source = source;
//     o$.operator = {
//         call(subscriber: Subscriber<unknown>, source: any): void {
//             source.subscribe(new DoubleSubscriber(subscriber));
//         }
//     }
//     return o$;
// }

function double(source: Observable<number>): Observable<any> {
    return source.lift({
        call(subscriber: Subscriber<unknown>, source: any): void {
            source.subscribe(new DoubleSubscriber(subscriber));
        }
    })
}


// const pipe = (...fns: Function[]) => (source: Observable<any>) => fns.reduce((acc, fn) => fn(acc), source);

const doubleWithFilter = pipe(
    double,
    filter<number>((v) => v % 3 === 0),
    map((v) => `Value is ${v}`)
)

//
interval(1000)
    .pipe(doubleWithFilter)
    .subscribe((v) => {
        console.log(v);
    }, () => {
    }, () => {
        console.log('complete');
    })

