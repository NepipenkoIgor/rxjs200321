import './styles.css';
import { combineLatest, EMPTY, fromEvent, Observable, of } from "rxjs";
import { debounceTime, map, pluck, switchMap, withLatestFrom } from "rxjs/operators";
import { userService } from "./user.service";


export class CreateForm {

    public valueSequence$: Observable<any>;
    private inputEl: HTMLInputElement;
    private saveButton: HTMLButtonElement;

    constructor(private formEl: HTMLFormElement) {
        this.inputEl = formEl.querySelector('input') as HTMLInputElement;
        this.saveButton = formEl.querySelector('button') as HTMLButtonElement;
        this.valueSequence$ = combineLatest([
            fromEvent<InputEvent>(this.inputEl, 'input')
                .pipe(pluck<InputEvent, string>('target', 'value')),
            userService.uniqueNameSequence$
        ]).pipe(
            debounceTime(300),
            switchMap(([value, names]: [string, string[]]) => {
                const isNotValid = names.find((name: string) => value === name);
                if (isNotValid) {
                    this.inputEl.classList.add(('error'));
                    this.saveButton.disabled = true;
                    return EMPTY;
                }
                this.inputEl.classList.remove(('error'));
                this.saveButton.disabled = false;
                return of(value)
            })
        );


        fromEvent(this.saveButton, 'click')
            .pipe(
                withLatestFrom(this.valueSequence$),
                map(([, value]) => value)
            ).subscribe((v) => {
            console.log(v);
        })
    }
}
