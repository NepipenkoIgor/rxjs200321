import { fromEvent, Observable } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";

export const box = document.querySelector('.draggable') as HTMLDivElement;
const mousedown$ = fromEvent<MouseEvent>(box, 'mousedown');
const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseup$ = fromEvent<MouseEvent>(box, 'mouseup');


export function drag(
    md$: Observable<MouseEvent>,
    mm$: Observable<MouseEvent>,
    mu$: Observable<MouseEvent>,
): Observable<{ left: number, top: number }> {
    return md$.pipe(
        switchMap((startEvent: MouseEvent) => {
            startEvent.preventDefault();
            console.log('Start');
            return mm$.pipe(
                map((moveEvent: MouseEvent) => {
                    moveEvent.preventDefault();
                    return {
                        left: moveEvent.clientX - startEvent.offsetX,
                        top: moveEvent.clientY - startEvent.offsetY,
                    }
                }),
                takeUntil(mu$)
            )
        })
    )
}


export const drag$ = drag(mousedown$, mousemove$, mouseup$);
