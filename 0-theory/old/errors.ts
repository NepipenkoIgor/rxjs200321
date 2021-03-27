import { EMPTY, interval, of, throwError, zip } from "rxjs";
import { catchError, delay, map, retry, retryWhen, switchMap } from "rxjs/operators";

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6');

const sequence$ = zip(sequence1$, sequence2$)


sequence$.pipe(
    switchMap(([x, y]) => {
        return of(y)
            .pipe(
                map((v) => {
                    return (v as any).toUpperCase();
                    // try {
                    //     return (y as any).toUpperCase();
                    // } catch (err) {
                    //     console.log('Try catch Err ---->', err);
                    //     return 'N';
                    // }
                }),
                catchError((err) => {
                    console.log('catchError catch Err ---->', err);
                    return  EMPTY
                })
            )
    })

    // retryWhen((errObs) => errObs.pipe(delay(3000))),
    // retry(3),
)
    .subscribe((value) => {
        console.log(value);
    }, (err) => {
        console.log('Err CB ----->', err);
    }, () => {
        console.log('completed')
    })
