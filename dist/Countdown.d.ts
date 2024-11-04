export declare class Countdown {
    private duration;
    private remainingTime;
    private intervalId;
    private pauseStartTime;
    private onEndCallback;
    constructor(hours: number, minutes: number, seconds: number, onEndCallback: () => void);
    start(): void;
    pause(): void;
    resume(): void;
    stop(): void;
    cancel(): void;
    isPaused(): boolean;
    getRemainingTime(): number;
}
