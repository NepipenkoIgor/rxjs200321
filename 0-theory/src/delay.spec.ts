// import '../../assets/css/style.css';
import { TestScheduler } from "rxjs/testing";
import { delay } from "./delay";
import { map } from "rxjs/operators";

describe('Delay tests', () => {

    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })

    it('should work', () => {
        testScheduler.run((helpers) => {
            const {cold, expectObservable} = helpers;
            const s1 = cold('-a--b--c---|', {
                a: 2,
                b: 3,
                c: 4
            });

            const s2 = '           9s -a--b--c---|';
            expectObservable(s1.pipe(delay(9000), map((x) => x * 2))).toBe(s2,
                {
                    a: 4,
                    b: 6,
                    c: 8
                })
        })
        expect(1).toEqual(1);
    })
})
