import { Timer } from "./Timer";
import { Countdown } from "./Countdown";
export declare class TimerSDK {
    static createTimer(): Timer;
    static createCountdown(hours: number, minutes: number, seconds: number, onEndCallback: () => void): Countdown;
}
