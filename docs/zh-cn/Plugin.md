# 插件列表

插件是一些独立的程序，可以给 Day.js 增加新功能和扩展已有功能

默认情况下，Day.js 只包含核心的代码，并没有安装任何插件

您可以加载多个插件来满足您的需求

## API

#### Extend

* Returns dayjs

Use a plugin.

```js
import plugin
dayjs.extend(plugin)
dayjs.extend(plugin, options) // with plugin options
```

## Installation

* Via NPM:

```javascript
import dayjs from 'dayjs'
import AdvancedFormat from 'dayjs/plugin/AdvancedFormat' // load on demand

dayjs.extend(AdvancedFormat) // use plugin
```

* Via CDN:
```html
<script src="https://unpkg.com/dayjs"></script>
<!-- Load plugin as window.dayjs_plugin_NAME -->
<script src="https://unpkg.com/dayjs/plugin/advancedFormat"></script>
<script>
  dayjs.extend(dayjs_plugin_advancedFormat);
</script>
```

## List of official plugins

### AdvancedFormat
 - AdvancedFormat extends `dayjs().format` API to supply more format options.

```javascript
import AdvancedFormat from 'dayjs/plugin/AdvancedFormat'

dayjs.extend(AdvancedFormat)

dayjs().format('Q Do k kk X x')
```

List of added formats:

| Format | Output           | Description                           |
| ------ | ---------------- | ------------------------------------- |
| `Q`    | 1-4              | Quarter                               |
| `Do`   | 1st 2nd ... 31st | Day of Month with ordinal             |
| `k`    | 1-23             | The hour, beginning at 1              |
| `kk`   | 01-23            | The hour, 2-digits, beginning at 1    |
| `X`    | 1360013296       | Unix Timestamp in second              |
| `x`    | 1360013296123    | Unix Timestamp in millisecond         |

## Customize

You could build your own Day.js plugin to meet different needs.

Feel free to open a pull request to share your plugin.

Template of a Day.js plugin.
```javascript
export default (option, dayjsClass, dayjsFactory) => {
  // extend dayjs()
  // e.g. add dayjs().isSameOrBefore()
  dayjsClass.prototype.isSameOrBefore = function (arguments) {}

  // extend dayjs
  // e.g. add dayjs.utc()
  dayjsFactory.utc = (arguments) => {}

  // overriding existing API
  // e.g. extend dayjs().format()
  const oldFormat = dayjsClass.prototype.format
  dayjsClass.prototype.format = function (arguments) {
    // original format result
    const result = oldFormat(arguments)
    // return modified result
  }
}
```