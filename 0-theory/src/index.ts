import '../../assets/css/style.css';
import { fromEvent, interval, Observable, Subscriber } from "rxjs";
import { pluck } from "rxjs/operators";

// const sequence = new Promise((res) => {
//     let count = 1;
//     setInterval(() => {
//         res(count++);
//     }, 1000);
// })
//
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// const sequence =  function* iteratorFn(){
//     let item = 1;
//     while (true) {
//         yield  item++;
//     }
// }();
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);

// ReactiveX = iterator + observer;
// interval(1000)
//     .subscribe((v) => {
//         console.log(v);
//     });
// let count = 1;
// const sequence$ = new Observable((subscriber: Subscriber<number>) => {
//     console.log('INITIATE');
//     const intervalID = setInterval(() => {
//         // if (count % 5 === 0) {
//         //     clearInterval(intervalID);
//         //     subscriber.complete();
//         //     return;
//         // }
//         subscriber.next(++count);
//     }, 1000)
// })
// // const sequence$ = fromEvent<MouseEvent>(document, 'click')
// sequence$.subscribe((v) => {
//     console.log(`Sub 1 ====> ${v}`);
// }, () => {
// }, () => {
//     console.log('complete');
// })
//
//
// setTimeout(() => {
//     sequence$.subscribe((v) => {
//         console.log(`Sub 2 ====> ${v}`);
//     }, () => {
//     }, () => {
//         console.log('complete');
//     })
// }, 5000)

const socket: WebSocket = new WebSocket('wss://echo.websocket.org');

const sequence$ = new Observable((subscriber: Subscriber<any>) => {
    function listener(e: Event) {
        subscriber.next(e);
    }

    socket.addEventListener('message', listener);
})

socket.addEventListener('open', (e) => {
    console.log('CONNECT') //
    let count = 0;
    const intervalId = setInterval(() => {
        socket.send((count++).toString());
    }, 2000)
    sequence$
        // .pipe(pluck('data'))
        .subscribe((e) => {
            console.log(`Sub 1 ===> ${e.data}`);
        });
    setTimeout(() => {
        sequence$
            // .pipe(pluck('data'))
            .subscribe((e) => {
                console.log(`Sub 2 ===> ${e.data}`);
            });
    }, 10000)
})

