export class Countdown {
  private duration: number;
  private remainingTime: number;
  private intervalId: any;
  private pauseStartTime: number | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor(hours: number, minutes: number, seconds: number, onEndCallback: () => void) {
    this.duration = (hours * 3600 + minutes * 60 + seconds) * 1000;
    this.remainingTime = this.duration;
    this.onEndCallback = onEndCallback;
  }

  start(): void {
    this.intervalId = setInterval(() => {
      if (!this.isPaused()) {
        this.remainingTime -= 1000;
      }
      if (this.remainingTime <= 0) {
        this.stop();
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      }
    }, 1000);
  }

  pause(): void {
    if (!this.isPaused()) this.pauseStartTime = Date.now();
  }

  resume(): void {
    if (this.isPaused() && this.pauseStartTime !== null) {
      this.remainingTime -= Date.now() - this.pauseStartTime;
      this.pauseStartTime = null;
    }
  }

  stop(): void {
    clearInterval(this.intervalId);
    this.remainingTime = 0;
  }

  cancel(): void {
    clearInterval(this.intervalId);
    this.remainingTime = this.duration;
  }

  isPaused(): boolean {
    return this.pauseStartTime !== null;
  }

  getRemainingTime(): number {
    return Math.ceil(this.remainingTime / 1000);
  }
}