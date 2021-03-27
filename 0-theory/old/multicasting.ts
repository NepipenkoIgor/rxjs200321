import { BehaviorSubject, ConnectableObservable, interval, ReplaySubject, Subject, Subscription } from "rxjs";
import { multicast, publish, refCount, share } from "rxjs/operators";

const sequence$ = interval(1000)
    .pipe(
        share()
        // publish + refCount = share()
        // multicast(subject) = publish
    ); //  as ConnectableObservable<any>

// sequence$.connect();
let sub1: Subscription;
setTimeout(() => {
    sub1 = sequence$.subscribe((v) => {
        console.log('Sub 1', v)
    })
}, 1000)

setTimeout(() => {
    sub1.unsubscribe();
}, 3000)


setTimeout(() => {
    sequence$.subscribe((v) => {
        console.log('Sub 2', v)
    })
}, 5000)
