# Timer-Countdown SDK

`Timer-Countdown SDK` 是一个用于提供计时器和倒计时功能的 JavaScript SDK。支持暂停、恢复、重置等功能，可独立使用计时器或倒计时。

## 功能

- **计时器功能**：可以记录开始时间、暂停、恢复、重置以及获取经过的时间。
- **倒计时功能**：支持设置小时、分钟、秒，支持暂停、恢复、取消操作，倒计时结束时会触发回调。

## 安装

1. Clone 项目：

```bash
git clone <repository-url>
cd timer-countdown
```

2.	安装依赖：
```bash
npm install
```
3.	构建项目：
```bash
npm run build
```

## **使用说明**

**浏览器中引入**

在 HTML 文件中通过 "<\script>" 标签引入 bundle.js 文件：

```html
<script src="./dist/bundle.js"></script>
```
计时器示例
```js
// 创建计时器实例
const timer = TimerSDK.createTimer();

// 开始计时
timer.start();

// 停止计时
setTimeout(() => {
  timer.stop();
  console.log(`计时器时间: ${timer.getDuration()} 秒`);
}, 5000);
```
倒计时示例
```js
// 创建倒计时实例，设置 1 分钟，并定义结束回调
const countdown = TimerSDK.createCountdown(0, 1, 0, () => {
  console.log('倒计时结束');
});

// 开始倒计时
countdown.start();
```
## **本地测试**

1.	使用以下命令运行测试用例：
```bash
npm test
```

2.	启动开发服务器并访问 index.html 进行可视化测试：
```bash
npm start
```

访问 http://localhost:9000/index.html, 可以交互式使用计时器和倒计时功能。

目录结构
```plaintext
├── src                   # 源代码
│   ├── Timer.ts          # Timer 类
│   ├── Countdown.ts      # Countdown 类
│   └── TimerSDK.ts       # SDK 封装入口
├── tests                 # 测试文件
│   ├── Timer.test.ts     # Timer 测试用例
│   ├── Countdown.test.ts # Countdown 测试用例
│   └── TimerSDK.test.ts  # SDK 测试用例
├── dist                  # 构建输出目录
│   └── bundle.js         # 打包后的 JS 文件
├── index.html            # 示例 HTML 文件
└── webpack.config.js     # Webpack 配置
```
许可证

MIT License