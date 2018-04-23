[English](./README.md) | 简体中文
<p align="center"><a href="#" target="_blank" rel="noopener noreferrer"><img width="550"
                                                                             src="https://user-images.githubusercontent.com/17680888/39081119-3057bbe2-456e-11e8-862c-646133ad4b43.png"
                                                                             alt="Day.js"></a></p>
<p align="center">Moment.js 的 <b>2kB</b> 轻量化方案，拥有同样强大的 API</p>
<br>
<p align="center">
    <a href="https://unpkg.com/dayjs/dist/dayjs.min.js"><img
            src="http://img.badgesize.io/https://unpkg.com/dayjs/dist/dayjs.min.js?compression=gzip&style=flat-square"
            alt="Gzip Size"></a>
    <a href="https://www.npmjs.com/package/dayjs"><img src="https://img.shields.io/npm/v/dayjs.svg?style=flat-square"
                                                       alt="NPM Version"></a>
    <a href="https://travis-ci.org/xx45/dayjs"><img
            src="https://img.shields.io/travis/xx45/dayjs/master.svg?style=flat-square" alt="Build Status"></a>
    <a href="https://codecov.io/gh/xx45/dayjs"><img
            src="https://img.shields.io/codecov/c/github/xx45/dayjs/master.svg?style=flat-square" alt="Codecov"></a>
    <a href="https://github.com/xx45/dayjs/blob/master/LICENSE"><img
            src="https://img.shields.io/npm/l/dayjs.svg?style=flat-square" alt="License"></a>
</p>

> Day.js 是一个轻量的 JavaScript 时间日期处理库，和 Moment.js 的 API 设计保持完全一样. 如果你曾经用过 Moment.js, 那么你已经知道如何使用  Day.js

```js
dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
```

- 🕒 和 Moment.js 相同的 API 和用法
- 💪 不可变数据 (Immutable)
- 🔥 支持链式操作 (Chainable)
- 📦 仅 2kb 大小的微型库
- 👫 全浏览器兼容
---

## 安卓

可以有如下多种方法安装使用 Day.js:

- NPM:
```console
    npm install dayjs --save
```
```js
    var dayjs = require('dayjs');
    dayjs().format();
```
- CDN:
```html
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://unpkg.com/dayjs"></script>
    <script>
      dayjs().format();
    </script>
```

- 下载到您自己的服务器上:

从 [https://unpkg.com/dayjs](https://unpkg.com/dayjs) 下载最新的 Dayjs 源文件，并自行部署到您的服务器上。

## 开始
`Dayjs` 并没有改变或覆盖 Javascript 原生的 `Date.prototype`， 而是创造了一个全新的包含 `Javascript Date` 对象的 `Dayjs` 的对象。

`Dayjs` 对象是不可变的, 所有的 API 操作都将返回一个新的 `Dayjs` 对象。


## API
如果没有特别说明，API 的返回值都是新的 `Dayjs` 对象。

* [解析](#parse)
  * [当前时间](#now)
  * [时间字符串](#string)
  * [Unix 时间戳 (毫秒)](#unix-timestamp-milliseconds)
  * [Date 对象](#date)
  * [复制](#clone)
  * [验证](#validation)
* [获取+设置](#get--set)
  * [年](#year)
  * [月](#month)
  * [日](#date-1)
  * [时](#hour)
  * [分](#minute)
  * [秒](#second)
  * [毫秒](#millisecond)
  * [设置](#set)
* [操作](#manipulate)
  * [增加](#add)
  * [减少](#subtract)
  * [开头时间](#start-of-time)
  * [末尾时间](#end-of-time)
* [显示](#display)
  * [格式化](#format)
  * [时间差](#different)
  * [Unix 时间戳 (毫秒)](#unix-timestamp-milliseconds-1)
  * [Unix 时间戳 (秒)](#unix-timestamp-seconds)
  * [天数 (月)](#days-in-month)
  * [Date 对象](#as-javascript-date)
  * [数组](#as-array)
  * [JSON](#as-json)
  * [ISO 8601 字符串](#as-ios-8601-string)
  * [对象](#as-object)
  * [字符串](#as-string)
* [查询](#query)
  * [是否之前](#is-before)
  * [是否相同](#is-same)
  * [是否之后](#is-after)
  * [是否闰年](#is-leap-year)

---
### 解析
在 `dayjs()` 中传入支持的格式
#### 当前时间
直接运行 `dayjs()`，得到包含当前时间和日期的 `Dayjs` 对象。
```js
dayjs();
```
### 时间字符串
可以解析传入的一个标准的[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)时间字符串。
```js
dayjs(String);
dayjs("1995-12-25");
```
### Unix 时间戳 (毫秒)
可以解析传入的一个 Unix 时间戳 (13位数字)。
```js
dayjs(Number);
dayjs(1318781876406);
```
### Date 对象
可以解析传入的一个 Javascript Date 对象。
```js
dayjs(Date);
dayjs(new Date(2018, 8, 18));
```
### 复制
`Dayjs` 对象是不可变的，如果你想获得一个对象的拷贝，请执行 `.clone()`。
向 `dayjs()` 里传入一个 `Dayjs` 对象也能实现同样的效果。
```js
dayjs(Dayjs);
dayjs().clone();
```
### 验证
- return Boolean

检测当前 `Dayjs` 对象是否是一个有效的时间。
```js
dayjs().isValid();
```
---
### 获取+设置
获取和改变日期。
#### 年
- return Number

获取年份。
```js
dayjs().year();
```
#### 月
- return Number

获取月份。
```js
dayjs().month();
```
#### 日
- return Number

获取日期。
```js
dayjs().date();
```
#### 时
- return Number

获取小时。
```js
dayjs().hour();
```
#### 分
- return Number

获取分钟。
```js
dayjs().minute();
```
#### 秒
- return Number

获取秒。
```js
dayjs().second();
```
#### 毫秒
- return Number

获取毫秒。
```js
dayjs().millisecond();
```
#### 设置
设置时间
传入的单位 (unit) 对大小写不敏感。
```js
dayjs().set(unit : String, value : Int);
dayjs().set('month', 3);  // April
moment().set('second', 30);
```
---
### 操作
你可以对 `Dayjs` 对象如下增加减少之类的操作：
```js
dayjs().startOf('month').add(1, 'day').subtract(1, 'year')
```
#### 增加
增加时间并返回一个新的 `Dayjs()` 对象。
```js
dayjs().add(value : Number, unit : String);
dayjs().add(7, 'day');
```
#### 减少
减少时间并返回一个新的 `Dayjs()` 对象，使用方法和 `dayjs#add` 相同。
```js
dayjs().subtract(value : Number, unit : String);
dayjs().subtract(7, 'year');
```
#### 开头时间
返回当前时间的开头时间的 `Dayjs()` 对象，如月份的第一天。
```js
dayjs().startOf(unit : String);
dayjs().startOf('year');
```
#### 末尾时间
返回当前时间的末尾时间的 `Dayjs()` 对象，如月份的最后一天。
```js
dayjs().endOf(unit : String);
dayjs().endOf('month');
```
---
### 显示
格式化 `Dayjs` 对象并展示。
#### 格式化
- return String

接收一系列的时间日期字符串并替换成相应的值。
```js
dayjs().format(String);
dayjs().format();                       // "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)
dayjs().format("[YYYY] MM-DDTHH:mm:ssZ"); // "[2014] 09-08T08:02:17-05:00"
```
#### 时间差
- return Number

获取两个 `Dayjs` 对象的时间差，默认毫秒。
```js
dayjs().diff(Dayjs, unit);
dayjs().diff(dayjs(), 'years'); // 0
```
#### Unix 时间戳 (毫秒)
- return Number

返回 Unix 时间戳 (毫秒)
```js
dayjs().valueOf();
```
#### Unix 时间戳 (秒)
- return Number

返回 Unix 时间戳 (秒)。
```js
dayjs().unix();
```
#### 天数 (月)
- return Number

返回月份的天数。
```js
dayjs().daysInMonth();
```
#### Date 对象
- return Javascript `Date` object

返回原生的 `Date` 对象。
```js
dayjs().toDate();
```
#### 数组
- return Array

返回包含时间数值的数组。
```js
dayjs().toArray(); //[2018, 8, 18, 00, 00, 00, 000];
```
#### As JSON
- return JSON String

当序列化 `Dayjs` 对象时，会返回 ISO8601 格式的字符串。
```js
dayjs().toJSON(); //"2018-08-08T00:00:00.000Z"
```
#### ISO 8601 字符串
- return String

返回 ISO8601 格式的字符串。
```js
dayjs().toISOString();
```
#### 对象
- return Object 

返回包含时间数值的对象。
```js
dayjs().toObject();// { years:2018, months:8, date:18, hours:0, minutes:0, seconds:0, milliseconds:0}
```
#### 字符串
- return String 

```js
dayjs().toString(); 
```
---
### 查询
#### 是否之前
- return Boolean

检查一个 `Dayjs` 对象是否在另一个 `Dayjs` 对象时间之前。
```js
dayjs().isBefore(Dayjs);
dayjs().isBefore(dayjs()); // false
```
#### 是否相同
- return Boolean

检查一个 `Dayjs` 对象是否和另一个 `Dayjs` 对象时间相同。
```js
dayjs().isSame(Dayjs);
dayjs().isSame(dayjs()); // true
```
#### 是否之后
- return Boolean

检查一个 `Dayjs` 对象是否在另一个 `Dayjs` 对象时间之后。
```js
dayjs().isAfter(Dayjs);
dayjs().isAfter(dayjs()); // false
```
#### 是否闰年
- return Boolean

是否闰年。 
```js
dayjs().isLeapYear();
dayjs('2000-01-01').isLeapYear(dayjs()); // true
```
---
## 开源协议

MIT