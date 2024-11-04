import { Countdown } from '../src/Countdown';

describe('Countdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should end after specified time', () => {
    const onEndCallback = jest.fn();
    const countdown = new Countdown(0, 0, 1, onEndCallback);
    countdown.start();

    jest.advanceTimersByTime(1000); // 模拟1秒
    expect(onEndCallback).toHaveBeenCalled();
  });

  test('should support pause and resume', () => {
    const countdown = new Countdown(0, 0, 5, jest.fn());
    countdown.start();

    countdown.pause();
    const pausedTime = countdown.getRemainingTime();

    jest.advanceTimersByTime(2000); // 模拟暂停2秒
    expect(countdown.getRemainingTime()).toBeCloseTo(pausedTime);

    countdown.resume();
    jest.advanceTimersByTime(1000); // 模拟恢复1秒
    expect(countdown.getRemainingTime()).toBeLessThan(pausedTime);
  });
});