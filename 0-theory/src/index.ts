import '../../assets/css/style.css';
import { AsyncSubject, BehaviorSubject, Observable, Observer, ReplaySubject, Subject } from "rxjs";
import { ajax } from "rxjs/ajax";
// Observable + Observer = Subject

const sequence$$ = new ReplaySubject(undefined, 1500);

// sequence$$.next()

// sequence$$.subscribe((v) => {
//     console.log('Comp1', v);
// })
//
// sequence$$.next({name: 'Ihor', age: 30})
// setTimeout(() => {
//     sequence$$.next({name: 'Ihor', age: 31})
// }, 1000);
// setTimeout(() => {
//     sequence$$.next({name: 'Ihor', age: 34})
// }, 2000);
// setTimeout(() => {
//     sequence$$.next({name: 'Ihor', age: 35})
//     sequence$$.subscribe((v) => {
//         console.log('Comp4', v);
//     })
// }, 3000);

//
// setTimeout(() => {
//     sequence$$.subscribe((v) => {
//         console.log('Comp2', v);
//     })
//     sequence$$.subscribe((v) => {
//         console.log('Comp3', v);
//     })
//
// }, 2000)
//
//
// setTimeout(() => {
//     sequence$$.complete();
//     sequence$$.subscribe((v) => {
//         console.log('Comp4', v);
//     })
// }, 4000)


function getUsers(url: string) {
    let subject: AsyncSubject<any>;
    return new Observable((observer: Observer<any>) => {
        if (!subject) {
            subject = new AsyncSubject();
            ajax(url).subscribe(subject)
        }
        return subject.subscribe(observer);
    })
}

const users$ = getUsers('http://learn.javascript.ru/courses/groups/api/participants?key=157iojl')
users$.subscribe((u) => {
    console.log(u);
})

setTimeout(() => {
    users$.subscribe((u) => {
        console.log(u);
    })
}, 5000);
