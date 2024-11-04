import { Timer } from "./Timer";
import { Countdown } from "./Countdown";

export class TimerSDK {
  public static createTimer(): Timer {
    return new Timer();
  }

  public static createCountdown(hours: number, minutes: number, seconds: number, onEndCallback: () => void): Countdown {
    return new Countdown(hours, minutes, seconds, onEndCallback);
  }
}