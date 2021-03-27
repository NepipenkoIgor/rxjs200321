import { fromEvent, interval, of } from "rxjs";
import { exhaust, exhaustMap, map, mergeAll, mergeMap, pluck, switchAll } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// const sequence$ = interval(2000)
//     .pipe(
//         map((v) => {
//             return of(v * 2);
//         })
//     )
//
// sequence$.subscribe((v) => {
//     v.subscribe((v1) => {
//         console.log(v1)
//     })
// })
const inputEl = document.querySelector('input') as HTMLInputElement;
const sequence$ = fromEvent(inputEl, 'input')
    .pipe(
        exhaustMap((e) => {
            const v = (e.target as HTMLInputElement).value;
            return ajax(`http://learn.javascript.ru/courses/groups/api/participants?key=157iojl&q=${v}`)
                .pipe(pluck('response'))
        }),
        // exhaust()
        // mergeAll(1)
        // mergeAll + map = mergeMap
        // switchAll + map = switchMap
        // concatAll + map = concatMap
        // exhaust + map = exhaustMap
    )

sequence$.subscribe((v) => {
    console.log(v)
    // v.subscribe((v1) => {
    //     console.log(v1)
    // })
})
