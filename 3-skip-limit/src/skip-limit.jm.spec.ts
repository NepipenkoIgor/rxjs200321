// import '../../assets/css/style.css';
import { TestScheduler } from "rxjs/testing";
import { skipLimit } from "./skip-limit";
import { cold } from "jasmine-marbles";

describe('SkipLimit tests [JM]', () => {

    it('should work', () => {
        const s1 = cold('-a--b----c----d---e-|', {
            a: 1,
            b: 2,
            c: 3,
            d: 10,
            e: 5
        });
        const s2 = cold('             ---------c----d-----|',   {
            c: 3,
            d: 10,
        });
        expect(s1.pipe(skipLimit(2, 2))).toBeObservable(s2);
    })
})
