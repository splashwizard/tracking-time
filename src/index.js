import * as C from './constant'
import * as Utils from './utils'

const parseConfig = (config) => {
  let reg
  if (config === null) return new Date(NaN) // Treat null as an invalid date
  if (!config) return new Date()
  if (config instanceof Date) return config
  // eslint-disable-next-line no-cond-assign
  if (reg = String(config).match(/^(\d{4})-?(\d{2})-?(\d{1,2})$/)) {
    // 2018-08-08 or 20180808
    return new Date(reg[1], reg[2] - 1, reg[3])
  }
  return new Date(config) // timestamp
}

class Dayjs {
  constructor(config) {
    this.$u = Utils
    this.$d = parseConfig(config)
    this.init()
  }

  init() {
    this.$zone = this.$d.getTimezoneOffset() / 60
    this.$zoneStr = this.$u.padStart(String(this.$zone * -1).replace(/^(.)?(\d)/, '$10$200'), 5, '+')
    this.$y = this.$d.getFullYear()
    this.$M = this.$d.getMonth()
    this.$D = this.$d.getDate()
    this.$W = this.$d.getDay()
    this.$H = this.$d.getHours()
    this.$m = this.$d.getMinutes()
    this.$s = this.$d.getSeconds()
    this.$ms = this.$d.getMilliseconds()
  }

  getOld(fn) {
    return this.$o[fn].bind(this)
  }

  isValid() {
    return !(this.$d.toString() === 'Invalid Date')
  }

  isLeapYear() {
    return ((this.$y % 4 === 0) && (this.$y % 100 !== 0)) || (this.$y % 400 === 0)
  }

  isSame(that) {
    return this.valueOf() === that.valueOf()
  }

  isBefore(that) {
    return this.valueOf() < that.valueOf()
  }

  isAfter(that) {
    return this.valueOf() > that.valueOf()
  }

  year() {
    return this.$y
  }

  month() {
    return this.$M
  }

  date() {
    return this.$D
  }

  hour() {
    return this.$H
  }

  minute() {
    return this.$m
  }

  second() {
    return this.$s
  }

  millisecond() {
    return this.$ms
  }

  unix() {
    return Math.floor(this.valueOf() / 1000)
  }

  valueOf() {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime()
  }

  startOf(units, isStartOf = true) { // isStartOf -> endOf
    const unit = this.$u.prettyUnit(units)
    const instanceFactory = (d, m, y = this.$y) => {
      const ins = new Dayjs(new Date(y, m, d))
      return isStartOf ? ins : ins.endOf(C.D)
    }
    const instanceFactorySet = (method, slice) => {
      const argumentStart = [0, 0, 0, 0]
      const argumentEnd = [23, 59, 59, 999]
      return new Dayjs(this.toDate()[method].apply( // eslint-disable-line prefer-spread
        this.toDate(),
        isStartOf ? argumentStart.slice(slice) : argumentEnd.slice(slice)
      ))
    }
    switch (unit) {
      case C.Y:
        return isStartOf ? instanceFactory(1, 0) :
          instanceFactory(31, 11, this.$y)
      case C.M:
        return isStartOf ? instanceFactory(1, this.$M) :
          instanceFactory(0, this.$M + 1, this.$y)
      case C.W:
        return isStartOf ? instanceFactory(this.$D - this.$W, this.$M) :
          instanceFactory(this.$D + (6 - this.$W), this.$M, this.$y)
      case C.D:
      case C.DATE:
        return instanceFactorySet('setHours', 0)
      case C.H:
        return instanceFactorySet('setMinutes', 1)
      case C.MIN:
        return instanceFactorySet('setSeconds', 2)
      case C.S:
        return instanceFactorySet('setMilliseconds', 3)
      default:
        return this.clone()
    }
  }

  endOf(arg) {
    return this.startOf(arg, false)
  }

  mSet(units, int) {
    const unit = this.$u.prettyUnit(units)
    switch (unit) {
      case C.DATE:
        this.$d.setDate(int)
        break
      case C.M:
        this.$d.setMonth(int)
        break
      case C.Y:
        this.$d.setFullYear(int)
        break
      case C.H:
        this.$d.setHours(int)
        break
      case C.MIN:
        this.$d.setMinutes(int)
        break
      case C.S:
        this.$d.setSeconds(int)
        break
      case C.MS:
        this.$d.setMilliseconds(int)
        break
      default:
        break
    }
    this.init()
    return this
  }

  set(string, int) {
    if (!this.$u.isNumber(int)) return this
    return this.clone().mSet(string, int)
  }

  add(number, units) {
    const unit = (units && units.length === 1) ? units : this.$u.prettyUnit(units)
    if (['M', C.M].indexOf(unit) > -1) {
      let date = this.set(C.DATE, 1).set(C.M, this.$M + number)
      date = date.set(C.DATE, Math.min(this.$D, date.daysInMonth()))
      return date
    }
    if (['y', C.Y].indexOf(unit) > -1) {
      return this.set(C.Y, this.$y + number)
    }
    let step
    switch (unit) {
      case 'm':
      case C.MIN:
        step = C.MILLISECONDS_A_MINUTE
        break
      case 'h':
      case C.H:
        step = C.MILLISECONDS_A_HOUR
        break
      case 'd':
      case C.D:
        step = C.MILLISECONDS_A_DAY
        break
      case 'w':
      case C.W:
        step = C.MILLISECONDS_A_WEEK
        break
      default: // s seconds
        step = C.MILLISECONDS_A_SECOND
    }
    const nextTimeStamp = this.valueOf() + (number * step)
    return new Dayjs(nextTimeStamp)
  }

  subtract(number, string) {
    return this.add(number * -1, string)
  }

  format(formatStr = 'YYYY-MM-DDTHH:mm:ssZ') {
    const weeks = 'Sunday.Monday.Tuesday.Wednesday.Thursday.Friday.Saturday'.split('.')
    const months = 'January.February.March.April.May.June.July.August.September.October.November.December'.split('.')
    return formatStr.replace(/Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,2}|Z{1,2}/g, (match) => {
      switch (match) {
        case 'YY':
          return String(this.$y).slice(-2)
        case 'YYYY':
          return String(this.$y)
        case 'M':
          return String(this.$M + 1)
        case 'MM':
          return this.$u.padStart(String(this.$M + 1), 2, '0')
        case 'MMM':
          return months[this.$M].slice(0, 3)
        case 'MMMM':
          return months[this.$M]
        case 'D':
          return String(this.$D)
        case 'DD':
          return this.$u.padStart(String(this.$D), 2, '0')
        case 'd':
          return String(this.$W)
        case 'dddd':
          return weeks[this.$W]
        case 'H':
          return String(this.$H)
        case 'HH':
          return this.$u.padStart(String(this.$H), 2, '0')
        case 'm':
          return String(this.$m)
        case 'mm':
          return this.$u.padStart(String(this.$m), 2, '0')
        case 's':
          return String(this.$s)
        case 'ss':
          return this.$u.padStart(String(this.$s), 2, '0')
        case 'Z':
          return `${this.$zoneStr.slice(0, -2)}:00`
        case 'ZZ':
          return this.$zoneStr
        default:
          return match
      }
    })
  }

  diff(input, units, float = false) {
    const unit = this.$u.prettyUnit(units)
    const that = input instanceof Dayjs ? input : new Dayjs(input)
    const diff = this - that
    let result = this.$u.monthDiff(this, that)
    switch (unit) {
      case C.Y:
        result /= 12
        break
      case C.M:
        break
      case C.Q:
        result /= 3
        break
      case C.W:
        result = diff / C.MILLISECONDS_A_WEEK
        break
      case C.D:
        result = diff / C.MILLISECONDS_A_DAY
        break
      case C.S:
        result = diff / C.MILLISECONDS_A_SECOND
        break
      default: // milliseconds
        result = diff
    }
    return float ? result : this.$u.absFloor(result)
  }

  daysInMonth() {
    return this.endOf(C.M).$D
  }

  clone() {
    return new Dayjs(this)
  }

  toDate() {
    return new Date(this.$d)
  }

  toArray() {
    return [
      this.$y,
      this.$M,
      this.$D,
      this.$H,
      this.$m,
      this.$s,
      this.$ms
    ]
  }

  toJSON() {
    return this.toISOString()
  }

  toISOString() {
    return this.toDate().toISOString()
  }

  toObject() {
    return {
      years: this.$y,
      months: this.$M,
      date: this.$D,
      hours: this.$H,
      minutes: this.$m,
      seconds: this.$s,
      milliseconds: this.$ms
    }
  }

  toString() {
    return this.$d.toUTCString()
  }
}


const dayjs = config => new Dayjs(config)
const applyExtend = (proto, factory) => {
  factory.extend = (plugin, isNew = false) => { // eslint-disable-line no-param-reassign
    // Return a new subclass instead of the original
    if (isNew) {
      // Extend the class
      class PluginDayjs extends proto {}

      // Apply the plugin
      plugin(PluginDayjs)

      // Make a new factory
      const pluginFactory = config => new PluginDayjs(config)

      // Apply this method, so the subclass can have more plugins
      applyExtend(PluginDayjs, pluginFactory)
      return pluginFactory
    }

    // Apply the plugin
    plugin(Dayjs)
    // Return the factory so it can be chained
    return factory
  }
}
applyExtend(Dayjs, dayjs)

export default dayjs
