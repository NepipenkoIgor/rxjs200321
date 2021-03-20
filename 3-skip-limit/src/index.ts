import '../../assets/css/style.css';
import { fromEvent, interval } from "rxjs";
import { skipLimit } from "./skip-limit";
import { terminalLog } from "../../utils/log-in-terminal";
import { map } from "rxjs/operators";

// interval(1000)
fromEvent<MouseEvent>(document, 'click')
    .pipe(
        map((e) => e.clientX),
        skipLimit(4, 3))
    .subscribe((v) => {
        terminalLog(`Value is ${v}`);
    })
