/*
   source ---1---2---3---4---5---6---7---8--
    skip(2,3)
          -----------3---4---5-----------8-
 */


import { Observable, Subscriber } from "rxjs";


class SkipLimitSubscriber extends Subscriber<any> {

    private _interval = 1;
    private _count = 1;

    constructor(subscriber: Subscriber<any>,
                private _skip: number, private _limit: number) {
        super(subscriber);
    }

    public next(value: any) {
        const borderLeft: number = this._interval * (this._skip + this._limit) - this._limit;
        const borderRight: number = borderLeft + this._limit;
        if (borderLeft < this._count && this._count <= borderRight) {
            super.next(value);
            this._count++;
            if (borderRight < this._count) {
                this._interval++;
            }
            return;
        }
        this._count++;
    }
}

export function skipLimit(skip: number, limit: number) {
    return (source: Observable<any>): Observable<any> => {
        return source.lift({
            call(subscriber: Subscriber<unknown>, source: any): void {
                source.subscribe(new SkipLimitSubscriber(subscriber, skip, limit));
            }
        })
    }
}
