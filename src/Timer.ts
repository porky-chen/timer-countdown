/**
 * 时间计时器
 * */
export class Timer {
  private startTime: number | null = null; // 开始时间
  private endTime: number | null = null;  // 结束时间
  private pausedTime: number = 0; // 暂停时长
  private pauseStartTime: number | null = null; // 暂停开始时间
  private lapTimes: number[] = []; // 存储计次时间点
  private lapStartTime: number | null = null; // 每次开始时间

  // 获取当前时间戳
  private getCurrentTime(): number {
    return Date.now();
  }

  // 启动计时器
  start(): void {
    const now = this.getCurrentTime();
    this.startTime = now;
    this.lapStartTime = now;
    this.endTime = null;
    this.pauseStartTime = null;
    this.pausedTime = 0
    this.lapTimes = []
  }

  // 停止计时器
  stop(): void {
    if (this.isPaused() && this.pauseStartTime !== null) {
      this.pausedTime += this.getCurrentTime() - this.pauseStartTime;
      this.pauseStartTime = null;
    }
    this.endTime = this.getCurrentTime();
  }

  // 暂停计时器
  pause(): void {
    if (!this.isPaused()) {
      this.pauseStartTime = this.getCurrentTime();
    }
  }

  // 恢复计时器
  resume(): void {
    if (this.isPaused() && this.pauseStartTime !== null) {
      this.pausedTime += this.getCurrentTime() - this.pauseStartTime;
      this.pauseStartTime = null;
    }
  }

  // 检查是否处于暂停状态
  isPaused(): boolean {
    return this.pauseStartTime !== null;
  }

  // 重置计时器
  reset(): void {
    this.startTime = null;
    this.endTime = null;
    this.pausedTime = 0;
    this.pauseStartTime = null;
    this.lapTimes = []
    this.lapStartTime = null
  }

  // 记录计次时间点
  lap(): void {
    if (this.lapStartTime !== null) {
      const now = this.getCurrentTime();
      const currentTime = now - this.lapStartTime - this.pausedTime;
      this.lapTimes.push(currentTime / 1000);
      this.lapStartTime = now;
      this.pausedTime = 0; // 每次记录完一圈时间后重置暂停时间
    }
  }

  // 获取所有的计次时间
  getLapTimes(): number[] {
    return this.lapTimes;
  }

  // 获取当前时间，从start->此刻，不会终止时间
  getDuration(): number | null {
    if (this.startTime === null) {
      return null; // 计时器尚未启动
    }

    if (this.endTime === null) {
      const now = this.getCurrentTime();
      return (now - this.startTime - this.pausedTime) / 1000; // 计时器仍在运行
    }

    return this.endTime - this.startTime - this.pausedTime; // 计时器已停止
  }

  // 获取已过去的时间（s），如果已经stop则返回总时长（不包含暂停时长），如果暂停中，返回暂停时长
  getElapsedDurationInSeconds(): number | null {
    const elapsedDurationInMillis = this.getElapsedDuration();

    return elapsedDurationInMillis !== null ? elapsedDurationInMillis / 1000 : null;
  }

  // 获取已过去的时间（ms）
  getElapsedDuration() {
    if (this.startTime === null) {
      return null; // 计时器尚未启动
    }

    const now = this.getCurrentTime();

    if (this.isPaused() && this.pauseStartTime !== null) {
      return now - this.pauseStartTime - this.pausedTime; // 计时器已暂停
    }

    return now - this.startTime - this.pausedTime; // 计时器正在运行或已停止
  }
}
