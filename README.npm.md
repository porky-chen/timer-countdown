# **timer-countdown-mini**

**imer-countdown-mini** 是一个支持计时和倒计时功能的 JavaScript SDK，适用于需要时间控制的前端项目。

## **安装**

可以通过 npm 安装 timer-countdown：
```bash
npm install timer-countdown
```
## **使用方法**

**引入 SDK**

在项目中引入 TimerSDK，即可使用计时器和倒计时功能。
```js
import { TimerSDK } from 'timer-countdown';
```
**计时器示例**

以下是一个使用 Timer 计时器功能的示例：
```js
const timer = TimerSDK.createTimer();
timer.start(); // 开始计时

setTimeout(() => {
  timer.stop(); // 停止计时
  console.log("计时持续时间（秒）:", timer.getDuration());
}, 5000); // 5秒后停止
```
**倒计时示例**

使用 Countdown 进行倒计时。倒计时结束后，调用指定的回调函数。
```js
const countdown = TimerSDK.createCountdown(0, 0, 10, () => {
  console.log("倒计时结束！");
});

countdown.start(); // 开始倒计时

// 暂停、恢复、取消倒计时
setTimeout(() => countdown.pause(), 5000); // 5秒后暂停
setTimeout(() => countdown.resume(), 7000); // 2秒后恢复
setTimeout(() => countdown.cancel(), 12000); // 12秒后取消
```
## **方法列表**

**TimerSDK**

-	createTimer(): 创建一个新的计时器实例。
-	createCountdown(hours, minutes, seconds, onEndCallback): 创建一个倒计时实例，支持设置小时、分钟、秒，并在倒计时结束时触发 onEndCallback。

**Timer**

-	start(): 开始计时。
-	stop(): 停止计时。
-	pause(): 暂停计时。
-	resume(): 恢复计时。
-	reset(): 重置计时器。
-	lap(): 记录计次时间。
-	getLapTimes(): 获取所有的计次时间。
-	getDuration(): 获取计时总时长。
-	getElapsedDurationInSeconds(): 获取已过去的时间（秒）。

**Countdown**

-	start(): 开始倒计时。
-	pause(): 暂停倒计时。
-	resume(): 恢复倒计时。
-	cancel(): 取消倒计时。

## **常见问题**

1.	如何安装依赖？
-	直接使用 npm install timer-countdown 安装即可。
2.	是否支持在 Node.js 环境中运行？
-	本 SDK 主要为前端应用设计，但在 Node.js 环境中也能正常运行。