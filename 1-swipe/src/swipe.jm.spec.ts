import { cold, hot } from "jasmine-marbles";
import { getX, swipe } from "./swipe";
import { zip } from "rxjs";


function createTouchEvent(clientX: number) {
    return new TouchEvent('event', {
        changedTouches: [
            new Touch({clientX, identifier: 1, target: new EventTarget()})]
    })
}

describe('Swipe tests [JM]', () => {

    it('should transform right', () => {
        const s1 = hot('-a--b----c--|', {
            a: createTouchEvent(200),
            b: createTouchEvent(600),
            c: createTouchEvent(1)
        });
        const s2 = hot('-a--b----c--|', {
            a: 200,
            b: 600,
            c: 1
        });
        expect(getX(s1)).toBeObservable(s2);
    })

    it('should work', () => {
        const s1 = hot('-a----b------|', {
            a: createTouchEvent(200),
            b: createTouchEvent(600),
            c: createTouchEvent(1)
        });
        const s2 = hot('---a-----b-----c---|', {
            a: createTouchEvent(250),
            b: createTouchEvent(300),
            c: createTouchEvent(10)
        });

        const s = hot('---a-----b---|', {
            a: -50,
            b: 300
        })
        expect(swipe(zip(getX(s1), getX(s2)))).toBeObservable(s);
    })
})
