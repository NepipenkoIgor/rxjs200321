import 'bootstrap';
import 'bootstrap-slider';
import '../../assets/css/style.css';
import './styles.css';
import { sendResult$ } from "./slider";

sendResult$.subscribe((v) => {
    console.log(v);
})
