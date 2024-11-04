import { Timer } from '../src/Timer';

describe('Timer', () => {
  let timer: Timer;

  beforeEach(() => {
    timer = new Timer();
  });

  test('should start and stop correctly', (done) => {
    timer.start();
    
    setTimeout(() => {
      const duration = timer.getDuration();
      expect(duration).toBeGreaterThan(0); // 检查时间确实流逝
      done();
    }, 50); // 延时 50ms
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