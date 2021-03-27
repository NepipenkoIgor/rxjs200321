import '../../assets/css/style.css';
import './styles.css';
import { animationDown } from "./animate";
import { terminalLog } from "../../utils/log-in-terminal";

const ball = document.querySelector(('.animated-shape')) as HTMLDivElement
animationDown(ball)
    .subscribe((frame) => {
        terminalLog(`Coord: ${frame}px`)
    }, () => {
    }, () => {
        terminalLog(`Completed`);
    })
