import { combineLatest, fromEvent, Observable } from "rxjs";
import { map, pluck, startWith, tap, withLatestFrom } from "rxjs/operators";

type TInitialValue = { element: HTMLElement, value: number };


const qualitySlider = $('#quality').slider();
const ratingSlider = $('#rating').slider();
const actualSlider = $('#actual').slider();

const quality$ = getValue(fromEvent(qualitySlider, 'change'), {
    value: 5,
    element: qualitySlider.parent().children(':first-child')[0]
}, redrawSlider)
const rating$ = getValue(fromEvent(ratingSlider, 'change'), {
    value: 5,
    element: ratingSlider.parent().children(':first-child')[0]
}, redrawSlider)
const actual$ = getValue(fromEvent(actualSlider, 'change'), {
    value: 5,
    element: actualSlider.parent().children(':first-child')[0]
}, redrawSlider)


const buttonClickSequence$ = fromEvent<MouseEvent>(document.querySelector('#send-result') as HTMLButtonElement, 'click')


export const sendResult$ = sendResult(
    buttonClickSequence$, sliderSequence(quality$, rating$, actual$),)

function sendResult(source1$: Observable<MouseEvent>, source2$: Observable<number>) {
    return source1$.pipe(withLatestFrom(source2$), pluck('1'));
}


function sliderSequence(...source: Observable<number>[]) {
    return combineLatest(source)
        .pipe(
            map(([q, r, a]: number[]) => {
                return Math.round((q + r + a) / 3 * 10);
            })
        )
}

function getValue(source$: Observable<any>, initialValue: TInitialValue, cb: (arg: TInitialValue) => void) {
    return source$
        .pipe(
            map(({delegateTarget: {previousElementSibling}, value: {newValue}}: any) => {
                return {
                    element: previousElementSibling,
                    value: newValue
                }
            }),
            startWith(initialValue),
            tap(cb),
            pluck('value')
        )
}

function redrawSlider({element, value}: any): void {
    const sliderTrack = element.querySelector('.slider-track');
    const v = value * 10;
    sliderTrack.classList.remove('good', 'bad', 'warn');
    if (v < 40) {
        sliderTrack.classList.add('bad');
        return;
    }
    if (v >= 40 && v <= 70) {
        sliderTrack.classList.add('warn');
        return;
    }
    sliderTrack.classList.add('good');
}
