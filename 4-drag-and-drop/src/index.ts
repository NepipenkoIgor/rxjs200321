import '../../assets/css/style.css';
import './styles.css';
import { box, drag$ } from "./drag-and-drop";

drag$.subscribe(({left, top}) => {
    box.style.top = `${top}px`;
    box.style.left = `${left}px`;
})
