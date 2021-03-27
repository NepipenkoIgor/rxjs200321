import 'bootstrap';
import '../../assets/css/style.css';
import './styles.css';
import './live-search';
import { liveSearch, request } from "./live-search";
import { ajax } from "rxjs/ajax";
import { fromEvent } from "rxjs";


const inputEl = document.querySelector('#search') as HTMLInputElement;
const containerEl = document.querySelector('.container') as HTMLDivElement;

liveSearch(
    fromEvent<InputEvent>(inputEl, 'input'),
    (text: string) => request(
        ajax(`https://api.github.com/search/repositories?q=${text}`)
    )
)
    .subscribe((htmlStr: string) => {
        containerEl.innerHTML = htmlStr;
    })

