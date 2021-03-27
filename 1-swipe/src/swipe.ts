import '../../assets/css/style.css';
import { fromEvent, merge, Observable, zip } from "rxjs";
import { filter, map } from "rxjs/operators";

const touchStart$ = getX(
    merge(
        fromEvent<MouseEvent>(document, 'mousedown'),
        fromEvent<TouchEvent>(document, 'touchstart'),
    )
);
const touchEnd$ = getX(
    merge(
        fromEvent<MouseEvent>(document, 'mouseup'),
        fromEvent<TouchEvent>(document, 'touchend'),
    )
);


export  function getX(source$: Observable<MouseEvent | TouchEvent>): Observable<number> {
    return source$
        .pipe(map((e: MouseEvent | TouchEvent) => {
            if (e instanceof TouchEvent) {
                return e.changedTouches[0].clientX
            }
            return e.clientX;
        }))
}

export function swipe(source$: Observable<[touchStartPosition: number, touchEndPosition: number]>): Observable<number> {
    return source$.pipe(
        map(([startX, endX]) => startX - endX),
        filter<number>(Boolean)
    )
}

export const swipe$: Observable<number> = swipe(zip(touchStart$, touchEnd$));

