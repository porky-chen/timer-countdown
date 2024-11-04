/**
 * 时间计时器
 * */
export declare class Timer {
    private startTime;
    private endTime;
    private pausedTime;
    private pauseStartTime;
    private lapTimes;
    private lapStartTime;
    private getCurrentTime;
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    isPaused(): boolean;
    reset(): void;
    lap(): void;
    getLapTimes(): number[];
    getDuration(): number | null;
    getElapsedDurationInSeconds(): number | null;
    getElapsedDuration(): number | null;
}
