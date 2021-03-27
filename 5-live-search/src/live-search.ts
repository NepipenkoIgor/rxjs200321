import { EMPTY, fromEvent, Observable } from "rxjs";
import {
    bufferCount, catchError,
    concatAll,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    pluck, reduce,
    switchMap, tap
} from "rxjs/operators";
import { ajax, AjaxResponse } from "rxjs/ajax";


export interface IResult {
    name: string,
    description: string,
    owner: {
        avatar_url: string;
    }
}


export function liveSearch(source1$: Observable<InputEvent>, sourceFn: (text: string) => Observable<any>) {
    return source1$
        .pipe(
            debounceTime(300),
            pluck<InputEvent, string>('target', 'value'),
            filter((text) => text.length > 3),
            distinctUntilChanged(),
            tap(() => {
                console.log('load start')
            }),
            switchMap(sourceFn),
        )
}

export function request(source1$: Observable<AjaxResponse>) {
    return source1$
        .pipe(
            pluck<AjaxResponse, IResult[]>('response', 'items'),
            concatAll(),
            map((res: IResult) => createCard(res).trim()),
            bufferCount(3),
            reduce((resultStr: string, htmlStrs: string[]) => {
                return resultStr += createRow(htmlStrs).trim();
            }, ''),
            tap(() => {
                console.log('load end');
            }),
            catchError((err) => {
                console.log('catchError catch Err ---->', err);
                return EMPTY
            })
        )
}

export function createRow(htmlStrs: string[]) {
    return `<div class="row">${htmlStrs.join(' ')}</div>`
}

export function createCard({name, description, owner: {avatar_url}}: IResult) {
    return `
       <div class="col-smp-6 col-md-4">
          <div class="card">
              <img class="card-img-top" src=${avatar_url} alt=${name}>
              <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                  <h5 class="card-text">${description}</h5>
              </div>
          </div>
       </div> 
    `
}
