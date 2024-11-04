import { TimerSDK } from '../src/TimerSDK';
import { Timer } from '../src/Timer';
import { Countdown } from '../src/Countdown';

describe('TimerSDK', () => {

  describe('createTimer', () => {
    let timer: Timer;

    beforeEach(() => {
      timer = TimerSDK.createTimer();
    });

    test('should create a Timer instance', () => {
      expect(timer).toBeInstanceOf(Timer);
    });

    test('should start and track time', (done) => {
      timer.start();
      setTimeout(() => {
        const duration = timer.getDuration();
        expect(duration).toBeGreaterThan(0); // 检查时间确实流逝
        done();
      }, 50);
    });

    test('should pause and resume correctly', (done) => {
      timer.start();
      timer.pause();

      const pausedTime = timer.getElapsedDurationInSeconds();
      setTimeout(() => {
        timer.resume();
        expect(timer.getElapsedDurationInSeconds()).toBeGreaterThanOrEqual(pausedTime!);
        done();
      }, 50);
    });
  });

  describe('createCountdown', () => {
    let countdown: Countdown;
    let onEndCallback: jest.Mock;

    beforeEach(() => {
      onEndCallback = jest.fn();
      countdown = TimerSDK.createCountdown(0, 0, 1, onEndCallback);
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    test('should create a Countdown instance', () => {
      expect(countdown).toBeInstanceOf(Countdown);
    });

    test('should end after specified time', () => {
      jest.useFakeTimers();
      countdown.start();

      jest.advanceTimersByTime(1000); // 模拟1秒
      expect(onEndCallback).toHaveBeenCalled(); // 验证倒计时结束时回调触发

      jest.useRealTimers();
    });

    test('should pause and resume correctly', () => {
      jest.useFakeTimers();
      countdown.start();
      countdown.pause();

      const pausedTime = countdown.getRemainingTime();

      jest.advanceTimersByTime(2000); // 模拟暂停2秒
      expect(countdown.getRemainingTime()).toBeCloseTo(pausedTime);

      countdown.resume();
      jest.advanceTimersByTime(500); // 模拟恢复0.5秒
      expect(countdown.getRemainingTime()).toBeLessThan(pausedTime);

      jest.useRealTimers();
    });

    test('should cancel countdown', () => {
      jest.useFakeTimers();
      countdown.start();
      countdown.cancel();

      jest.advanceTimersByTime(1000); // 倒计时取消后，回调不应触发
      expect(onEndCallback).not.toHaveBeenCalled();

      jest.useRealTimers();
    });
  });
});