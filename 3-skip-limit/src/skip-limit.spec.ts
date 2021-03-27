// import '../../assets/css/style.css';
import { TestScheduler } from "rxjs/testing";
import { skipLimit } from "./skip-limit";

describe('SkipLimit tests', () => {

    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })

    it('should work', () => {
        testScheduler.run((helpers) => {
            const {cold, expectObservable} = helpers;
            const s1 = cold('-a--b----c----d---e-|', {
                a: 1,
                b: 2,
                c: 3,
                d: 10,
                e: 5
            });

            const s2 = '             ---------c----d-----|';
            expectObservable(s1.pipe(skipLimit(2, 2))).toBe(s2,
                {
                    c: 3,
                    d: 10,
                });
        })
    })
})
