import { Observable, timer } from "rxjs";
import { ajax } from "rxjs/ajax";
import { concatAll, map, pluck, shareReplay, switchMap, toArray } from "rxjs/operators";

class UserService {

    private count = 0;

    public uniqueNameSequence$: Observable<string[]> = timer(0, 16000)
        .pipe(
            switchMap(() => {
                return ajax(`http://learn.javascript.ru/courses/groups/api/participants?key=157iojl`)
                    .pipe(
                        pluck('response'),
                        concatAll(),
                        pluck<any, string>('profileName'),
                        toArray(),
                        map((names: string[]) => {
                            if (this.count === 0) {
                                this.count++;
                                return [...names, 'inepipenko'];
                            }
                            return names;
                        })
                        /*   shareReplay()*/
                    )
            }),
            shareReplay()
        )
}

export const userService = new UserService();
