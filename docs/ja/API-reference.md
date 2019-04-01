## API Reference

Day.js は組み込みの `Date.prototype` を変更する代わりに `Dayjs` オブジェクトと呼ばれる Date オブジェクトのラッパーを作成します。

`Dayjs` オブジェクトは不変 (immutable) です。すなわち、すべての API 操作は新しい `Dayjs` オブジェクトを返します。

- [Parse](#parse)
  - [Now](#now)
  - [String](#string)
  - [Date](#date)
  - [Unix Timestamp (milliseconds)](#unix-timestamp-milliseconds)
  - [Unix Timestamp (seconds)](#unix-timestamp-seconds)
  - [Custom Parse Format](#custom-parse-format)
  - [Clone](#clone)
  - [Validation](#validation)
- [Get + Set](#get--set)
  - [Year](#year)
  - [Month](#month)
  - [Date of Month](#date-of-month)
  - [Day of Week](#day-of-week)
  - [Hour](#hour)
  - [Minute](#minute)
  - [Second](#second)
  - [Millisecond](#millisecond)
  - [Get](#get)
  - [Set](#set)
- [Manipulate](#manipulate)
  - [Add](#add)
  - [Subtract](#subtract)
  - [Start of Time](#start-of-time)
  - [End of Time](#end-of-time)
- [Display](#display)
  - [Format](#format)
  - [Difference](#difference)
  - [Unix Timestamp (milliseconds)](#unix-timestamp-milliseconds-1)
  - [Unix Timestamp (seconds)](#unix-timestamp-seconds)
  - [UTC offset (minutes)](#utc-offset-minutes-utcoffset)
  - [Days in Month](#days-in-month)
  - [As Javascript Date](#as-javascript-date)
  - [As JSON](#as-json)
  - [As ISO 8601 String](#as-iso-8601-string)
  - [As String](#as-string)
- [Query](#query)
  - [Is Before](#is-before)
  - [Is Same](#is-same)
  - [Is After](#is-after)
  - [Is a Dayjs](#is-a-dayjs)
- [UTC](#utc)
- [Plugin APIs](#plugin-apis)

---

Day.js は指定されない限り、常に新しい Dayjs オブジェクトを返します。

### Parse

サポートされている入力形式のいずれかで `dayjs()` を呼び出します。

#### Now

現在の日付と時間を取得するには、パラメータなしで dayjs() を呼び出します。

```js
dayjs()
```

### String

[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) に準拠する形式から作成します。

```js
dayjs(String)
dayjs('1995-12-25')
```

### Date

JavaScript の組み込みの Date オブジェクトを渡します。

```js
dayjs(Date)
dayjs(new Date(2018, 8, 18))
```

### Unix Timestamp (milliseconds)

Unix エポック (1970 年 1 月 1 日 12:00AM UTC) 以降のミリ秒数を表す整数値を渡します。

```js
dayjs(Number)
dayjs(1318781876406)
```

### Unix Timestamp (seconds)

```js
dayjs.unix(Number)
dayjs.unix(1318781876)
```

### Custom Parse Format

- parse custom formats `dayjs("12-25-1995", "MM-DD-YYYY")` in plugin [`CustomParseFormat`](./Plugin.md#customparseformat)

### Clone

すべての `Dayjs` は不変 (immutable) です。 オブジェクトのコピーが必要な場合は、 `.clone()` を呼び出してください。
`Dayjs` オブジェクトに対して dayjs() を呼び出すと、それもクローンされます。

```js
dayjs(Dayjs)
dayjs().clone()
```

### Validation

- Boolean を返します

`Dayjs` オブジェクトが有効な日付かどうかをチェックします。

```js
dayjs().isValid()
```

---

### Get + Set

日付の取得と設定です。

#### Year

Gets or sets the year.

```js
dayjs().year()
dayjs().year(2000)
```

#### Month

Gets or sets the month. Starts at 0

```js
dayjs().month()
dayjs().month(0)
```

#### Date of Month

Gets or sets the day of the month. Starts at 1

```js
dayjs().date()
dayjs().date(1)
```

#### Day of Week

Gets or sets the day of the week. Starts on Sunday with 0

```js
dayjs().day()
dayjs().day(0)
```

#### Hour

Gets or sets the hour.

```js
dayjs().hour()
dayjs().hour(12)
```

#### Minute

Gets or sets the minute.

```js
dayjs().minute()
dayjs().minute(59)
```

#### Second

Gets or sets the second.

```js
dayjs().second()
dayjs().second(1)
```

#### Millisecond

Gets or sets the millisecond.

```js
dayjs().millisecond()
dayjs().millisecond(1)
```

#### Get

Returns a `number` with information getting from `Dayjs` object
単位は大文字・小文字を区別しません。

```js
dayjs().get(unit: String)
dayjs().get('month') // start 0
dayjs().get('day')
```

#### List of all available units

| Unit          | Shorthand | Description                              |
| ------------- | --------- | ---------------------------------------- |
| `date`        |           | Date of Month                            |
| `day`         | `d`       | Day of Week (Sunday as 0, Saturday as 6) |
| `month`       | `M`       | Month                                    |
| `year`        | `y`       | Year                                     |
| `hour`        | `h`       | Hour                                     |
| `minute`      | `m`       | Minute                                   |
| `second`      | `s`       | Second                                   |
| `millisecond` | `ms`      | Millisecond                              |

#### Set

日付のセッターです。

```js
dayjs().set(unit: String, value: Int)
dayjs().set('date', 1)
dayjs().set('month', 3) // 4月
dayjs().set('second', 30)
```

### Manipulate

`Dayjs` オブジェクトは次のような方法で操作することができます:

```js
dayjs()
  .startOf('month')
  .add(1, 'day')
  .subtract(1, 'year')
```

#### Add

時間を足して新しい `Dayjs` オブジェクトを返します。

```js
dayjs().add(value: Number, unit: String)
dayjs().add(7, 'day')
```

#### Subtract

時間を引いて新しい `Dayjs` オブジェクトを返します。 `dayjs#add` と全く同じです。

```js
dayjs().subtract((value: Number), (unit: String))
dayjs().subtract(7, 'year')
```

#### Start of Time

Returns a new `Dayjs` object by by setting it to the start of a unit of time.

ある単位の始まりの時間の新しい `Dayjs` オブジェクトを返します。

```js
dayjs().startOf((unit: String))
dayjs().startOf('week') // Depends on `weekStart` in locale
```

#### End of Time

ある単位の終わりの時間の新しい `Dayjs` オブジェクトを返します。

```js
dayjs().endOf((unit: String))
dayjs().endOf('month')
```

---

### Display

パースや操作が完了したならば `Dayjs` オブジェクトを表示する方法が求められるはずです。

#### Format

- String を返します

文字列を受け取り、対応する日付の値で置き換えます。

```js
dayjs().format(String)
dayjs().format() // "2014-09-08T08:02:17-05:00" (ISO 8601 形式、小数部は含まない)
dayjs('2019-01-25').format('[YYYY] YYYY-MM-DDTHH:mm:ssZ[Z]') // 'YYYY 2019-01-25T00:00:00-02:00Z'
```

- 文字列内の文字をエスケープするには、文字を角括弧で囲みます (例: [Z]) 。

使用可能なフォーマットの一覧:

| フォーマット | 出力             | 説明                        |
| ------------ | ---------------- | --------------------------- |
| `YY`         | 18               | 2 桁の年                    |
| `YYYY`       | 2018             | 4 桁の年                    |
| `M`          | 1-12             | 1 始まりの月                |
| `MM`         | 01-12            | 1 始まりかつ 2 桁の月       |
| `MMM`        | Jan-Dec          | 月の略称                    |
| `MMMM`       | January-December | 月の正式名                  |
| `D`          | 1-31             | 日                          |
| `DD`         | 01-31            | 2 桁の日                    |
| `d`          | 0-6              | 曜日 (日曜は 0)             |
| `dd`         | Su-Sa            | 最も短い曜日の略称          |
| `ddd`        | Sun-Sat          | 曜日の略称                  |
| `dddd`       | Sunday-Saturday  | 曜日名                      |
| `H`          | 0-23             | 時間                        |
| `HH`         | 00-23            | 2 桁の時間                  |
| `h`          | 1-12             | 12 時制の時間               |
| `hh`         | 01-12            | 12 時制かつ 2 桁の時間      |
| `m`          | 0-59             | 分                          |
| `mm`         | 00-59            | 2 桁の分                    |
| `s`          | 0-59             | 秒                          |
| `ss`         | 00-59            | 2 桁の秒                    |
| `SSS`        | 000-999          | 3 桁のミリ秒                |
| `Z`          | +5:00            | UTC からのオフセット        |
| `ZZ`         | +0500            | UTC からの 2 桁のオフセット |
| `A`          | AM PM            | 午前と午後 (大文字)         |
| `a`          | am pm            | 午前と午後 (小文字)         |

- plugin [`AdvancedFormat`](./Plugin.md#advancedformat) にはより多くのフォーマット（例： `Q Do k kk X x ...` ）が存在します。
- Localized format options `L LT LTS ...` in plugin [`LocalizedFormat`](./Plugin.md#localizedFormat)

#### Difference

- Number を返します

2 つの `Dayjs` オブジェクトの差をミリ秒単位で取得します。

```js
const date1 = dayjs('2019-01-25')
const date2 = dayjs('2018-06-05')
date1.diff(date2) // 20214000000
date1.diff(date2, 'month') // 7
date1.diff(date2, 'month', true) // 7.645161290322581
date1.diff(date2, 'day') // 233
```

#### Unix Timestamp (milliseconds)

- Number を返します

Unix エポックからのミリ秒数を出力します。

```js
dayjs().valueOf()
```

#### Unix Timestamp (seconds)

- Number を返します

Unix タイムスタンプ (Unix エポックからの秒数) を出力します。

```js
dayjs().unix()
```

### UTC Offset (minutes)

Returns the UTC offset in minutes for the `Dayjs`.

```js
dayjs().utcOffset()
```

#### Days in Month

- Number を返します

その月の日数を取得します。

```js
dayjs().daysInMonth()
```

#### As Javascript Date

- Javascript の `Date` オブジェクトを返します

`Dayjs` オブジェクトから組み込みの `Date` オブジェクトのコピーを取得します。

```js
dayjs().toDate()
```

#### As JSON

- JSON String を返します

`Dayjs` オブジェクトを JSON シリアライズし、ISO8601 形式の日付文字列を返します。

```js
dayjs().toJSON() //"2018-08-08T00:00:00.000Z"
```

#### As ISO 8601 String

- String を返します

ISO8601 形式の文字列にフォーマットします。

```js
dayjs().toISOString()
```

#### As String

- String を返します

```js
dayjs().toString()
```

---

### Query

#### Is Before

- Boolean を返します

`Dayjs` オブジェクトが別の `Dayjs` オブジェクト以前の値かどうかを判定します。

```js
dayjs().isBefore(Dayjs, unit? : String);
dayjs().isBefore(dayjs()); // false
dayjs().isBefore(dayjs(), 'year'); // false
```

#### Is Same

- Boolean を返します

`Dayjs` オブジェクトが別の `Dayjs` オブジェクトの値と等しいかどうかを判定します。

```js
dayjs().isSame(Dayjs, unit? : String);
dayjs().isSame(dayjs()); // true
dayjs().isSame(dayjs(), 'year'); // true
```

#### Is After

- Boolean を返します

`Dayjs` オブジェクトが別の `Dayjs` オブジェクト以降の値かどうかを判定します。

```js
dayjs().isAfter(Dayjs, unit? : String);
dayjs().isAfter(dayjs()); // false
dayjs().isAfter(dayjs(), 'year'); // false
```

#### Is a Dayjs

- Boolean を返します

与えられた値が `Dayjs` オブジェクトであるかどうかを判定します。

```js
dayjs.isDayjs(compared: any);
dayjs.isDayjs(dayjs()); // true
dayjs.isDayjs(new Date()); // false
```

The operator `instanceof` works equally well:

```js
dayjs() instanceof dayjs // true
```

### UTC

If you want to parse or display in UTC, you can use `.utc` `.local` `.isUTC` with plugin [`UTC`](./Plugin.md#utc)

### Plugin APIs

#### RelativeTime

`.from` `.to` `.fromNow` `.toNow` は相対的な時刻を返します。

plugin [`RelativeTime`](./Plugin.md#relativetime)

#### IsLeapYear

`.isLeapYear` はうるう年かどうかを返します。

plugin [`IsLeapYear`](./Plugin.md#isleapyear)

#### WeekOfYear

`.week` はその年の何週目かを返します。

plugin [`WeekOfYear`](./Plugin.md#weekofyear)

### IsoWeeksInYear

`.isoWeeksInYear` to get the number of weeks in year

plugin [`IsoWeeksInYear`](./Plugin.md#isoweeksinyear)

#### IsSameOrAfter

`.isSameOrAfter` はある日付が別の日付と同じまたは以降かどうかを判定します。

plugin [`IsSameOrAfter`](./Plugin.md#issameorafter)

#### IsSameOrBefore

`.isSameOrBefore` はある日付が別の日付と同じまたは以前かどうか判定します。

plugin [`IsSameOrBefore`](./Plugin.md#issameorbefore)

#### IsBetween

`.isBetween` はある日付が別の 2 つの日付の間にあるかどうかを判定します。

plugin [`IsBetween`](./Plugin.md#isbetween)

### QuarterOfYear

`.quarter` to get quarter of the year

plugin [`QuarterOfYear`](./Plugin.md#quarterofyear)

### ToArray

`.toArray` to return an `array` that mirrors the parameters

plugin [`ToArray`](./Plugin.md#toarray)

### ToObject

`.toObject` to return an `object` with the date's properties.

plugin [`ToObject`](./Plugin.md#toobject)

### MinMax

`.min` `.max` to compare given dayjs instances.

plugin [`MinMax`](./Plugin.md#minmax)

### Calendar

`.calendar` to display calendar time

plugin [`Calendar`](./Plugin.md#calendar)
