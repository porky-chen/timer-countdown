/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TimerSDK"] = factory();
	else
		root["TimerSDK"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Countdown.ts":
/*!**************************!*\
  !*** ./src/Countdown.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Countdown = void 0;\nclass Countdown {\n    constructor(hours, minutes, seconds, onEndCallback) {\n        this.pauseStartTime = null;\n        this.onEndCallback = null;\n        this.duration = (hours * 3600 + minutes * 60 + seconds) * 1000;\n        this.remainingTime = this.duration;\n        this.onEndCallback = onEndCallback;\n    }\n    start() {\n        this.intervalId = setInterval(() => {\n            if (!this.isPaused()) {\n                this.remainingTime -= 1000;\n            }\n            if (this.remainingTime <= 0) {\n                this.stop();\n                if (this.onEndCallback) {\n                    this.onEndCallback();\n                }\n            }\n        }, 1000);\n    }\n    pause() {\n        if (!this.isPaused())\n            this.pauseStartTime = Date.now();\n    }\n    resume() {\n        if (this.isPaused() && this.pauseStartTime !== null) {\n            this.remainingTime -= Date.now() - this.pauseStartTime;\n            this.pauseStartTime = null;\n        }\n    }\n    stop() {\n        clearInterval(this.intervalId);\n        this.remainingTime = 0;\n    }\n    cancel() {\n        clearInterval(this.intervalId);\n        this.remainingTime = this.duration;\n    }\n    isPaused() {\n        return this.pauseStartTime !== null;\n    }\n    getRemainingTime() {\n        return Math.ceil(this.remainingTime / 1000);\n    }\n}\nexports.Countdown = Countdown;\n\n\n//# sourceURL=webpack://TimerSDK/./src/Countdown.ts?");

/***/ }),

/***/ "./src/Timer.ts":
/*!**********************!*\
  !*** ./src/Timer.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Timer = void 0;\n/**\n * 时间计时器\n * */\nclass Timer {\n    constructor() {\n        this.startTime = null; // 开始时间\n        this.endTime = null; // 结束时间\n        this.pausedTime = 0; // 暂停时长\n        this.pauseStartTime = null; // 暂停开始时间\n        this.lapTimes = []; // 存储计次时间点\n        this.lapStartTime = null; // 每次开始时间\n    }\n    // 获取当前时间戳\n    getCurrentTime() {\n        return Date.now();\n    }\n    // 启动计时器\n    start() {\n        const now = this.getCurrentTime();\n        this.startTime = now;\n        this.lapStartTime = now;\n        this.endTime = null;\n        this.pauseStartTime = null;\n        this.pausedTime = 0;\n        this.lapTimes = [];\n    }\n    // 停止计时器\n    stop() {\n        if (this.isPaused() && this.pauseStartTime !== null) {\n            this.pausedTime += this.getCurrentTime() - this.pauseStartTime;\n            this.pauseStartTime = null;\n        }\n        this.endTime = this.getCurrentTime();\n    }\n    // 暂停计时器\n    pause() {\n        if (!this.isPaused()) {\n            this.pauseStartTime = this.getCurrentTime();\n        }\n    }\n    // 恢复计时器\n    resume() {\n        if (this.isPaused() && this.pauseStartTime !== null) {\n            this.pausedTime += this.getCurrentTime() - this.pauseStartTime;\n            this.pauseStartTime = null;\n        }\n    }\n    // 检查是否处于暂停状态\n    isPaused() {\n        return this.pauseStartTime !== null;\n    }\n    // 重置计时器\n    reset() {\n        this.startTime = null;\n        this.endTime = null;\n        this.pausedTime = 0;\n        this.pauseStartTime = null;\n        this.lapTimes = [];\n        this.lapStartTime = null;\n    }\n    // 记录计次时间点\n    lap() {\n        if (this.lapStartTime !== null) {\n            const now = this.getCurrentTime();\n            const currentTime = now - this.lapStartTime - this.pausedTime;\n            this.lapTimes.push(currentTime / 1000);\n            this.lapStartTime = now;\n            this.pausedTime = 0; // 每次记录完一圈时间后重置暂停时间\n        }\n    }\n    // 获取所有的计次时间\n    getLapTimes() {\n        return this.lapTimes;\n    }\n    // 获取当前时间，从start->此刻，不会终止时间\n    getDuration() {\n        if (this.startTime === null) {\n            return null; // 计时器尚未启动\n        }\n        if (this.endTime === null) {\n            const now = this.getCurrentTime();\n            return (now - this.startTime - this.pausedTime) / 1000; // 计时器仍在运行\n        }\n        return this.endTime - this.startTime - this.pausedTime; // 计时器已停止\n    }\n    // 获取已过去的时间（s），如果已经stop则返回总时长（不包含暂停时长），如果暂停中，返回暂停时长\n    getElapsedDurationInSeconds() {\n        const elapsedDurationInMillis = this.getElapsedDuration();\n        return elapsedDurationInMillis !== null ? elapsedDurationInMillis / 1000 : null;\n    }\n    // 获取已过去的时间（ms）\n    getElapsedDuration() {\n        if (this.startTime === null) {\n            return null; // 计时器尚未启动\n        }\n        const now = this.getCurrentTime();\n        if (this.isPaused() && this.pauseStartTime !== null) {\n            return now - this.pauseStartTime - this.pausedTime; // 计时器已暂停\n        }\n        return now - this.startTime - this.pausedTime; // 计时器正在运行或已停止\n    }\n}\nexports.Timer = Timer;\n\n\n//# sourceURL=webpack://TimerSDK/./src/Timer.ts?");

/***/ }),

/***/ "./src/TimerSDK.ts":
/*!*************************!*\
  !*** ./src/TimerSDK.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TimerSDK = void 0;\nconst Timer_1 = __webpack_require__(/*! ./Timer */ \"./src/Timer.ts\");\nconst Countdown_1 = __webpack_require__(/*! ./Countdown */ \"./src/Countdown.ts\");\nclass TimerSDK {\n    static createTimer() {\n        return new Timer_1.Timer();\n    }\n    static createCountdown(hours, minutes, seconds, onEndCallback) {\n        return new Countdown_1.Countdown(hours, minutes, seconds, onEndCallback);\n    }\n}\nexports.TimerSDK = TimerSDK;\n\n\n//# sourceURL=webpack://TimerSDK/./src/TimerSDK.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/TimerSDK.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});