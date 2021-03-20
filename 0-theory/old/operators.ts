import { concat, interval } from "rxjs";
import { filter, map, skip, take, tap } from "rxjs/operators";


// of(1, 2, 2, 3, 4)
//     .subscribe((v) => {
//         console.log(v);
//     })

// from(fetch('http://learn.javascript.ru/courses/groups/api/participants?key=157iojl').then((res) => res.json()))
//     .subscribe((v) => {
//         console.log(v);
//     })

// from([1, 2, 3, 4, 5])
//     .subscribe((v) => {
//         console.log(v);
//     })


// ajax('http://learn.javascript.ru/courses/groups/api/participants?key=157iojl')
//     .subscribe((res: AjaxResponse) => {
//         console.log(res);
//     })

// const random = Math.round(Math.random() * 10);
// const sequence$ = iif(() => {
//     return random >= 5;
// }, of(`First number ${random}`), of(`Second number ${random}`));
//
// sequence$.subscribe((v) => {
//     console.log(v);
// })

// const sequence$ = defer(() => {
//     return random >= 5
//         ? random >= 8
//             ? of(`First number ${random}`)
//             : of(`Second number ${random}`)
//         : of(`Third number ${random}`)
// })
//
// sequence$.subscribe((v) => {
//     console.log(v);
// })


// ajax('http://learn.javascript.ru/courses/groups/api/participants?key=157iojl')
//     .pipe(
//         pluck('response'),
//         concatAll(),
//         map((user: any) => `${user.firstName} ${user.surname}`),
//         toArray()
//     )
//     .subscribe((userWithFullName: any[]) => {
//         console.log(userWithFullName);
//     })

/*
import fs from 'fs';
import util from 'util';
import { bindNodeCallback, from } from "rxjs";
import { distinctUntilChanged, isEmpty, map } from "rxjs/operators";

// const readFile = bindNodeCallback(fs.readFile);
const pReadFile  = util.promisify(fs.readFile);
const readFile = from(pReadFile(`${__dirname}/text`))
readFile
    .pipe(
        map((buffer) => {
            const str = buffer.toString();
            const regExp = />([^<]+)</;
            const matches = regExp.exec(str);
            return matches && matches[1];
        })
    ).subscribe((v) => {
    console.log(v);
})
*/


const sequence$ = interval(1000);
const sequence2$ = interval(1000)
    .pipe(skip(2), take(2));

/*
   sequence$ ---0---1---2---3---4--
      filter((x: number)=> x%2=== 0)
             ---0-------2-------4--
      tap((x: number)=> x*2)
             ---0-------2-------4--
      map((x: number)=> x*2);
             ---0-------4-------8--
      skip(1)
             -----------4-------8--
      take(2)
             -----------4-------8|
      concat sequence1$

   sequence$ -----------4-------8-----------2---3|
 */
const s1$ = sequence$.pipe(
    filter((x: number) => x % 2 === 0),
    tap((x: number) => x * 2),
    map((x: number) => x * 2),
    skip(1),
    take(2),
);
concat(s1$, sequence2$)
    .subscribe((v) => {
        console.log(v);
    })
