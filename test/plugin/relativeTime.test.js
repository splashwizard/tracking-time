import MockDate from 'mockdate'
import moment from 'moment'
import dayjs from '../../src'
import relativeTime from '../../src/plugin/relativeTime'
import utc from '../../src/plugin/utc'
import '../../src/locale/ru'

dayjs.extend(relativeTime)

beforeEach(() => {
  MockDate.set(new Date('2018-04-04T16:00:00.000Z'))
})

afterEach(() => {
  MockDate.reset()
})

it('Time from X', () => {
  const T = [
    [0, 'second'], // a few seconds
    [1, 'second'], // a few seconds
    [44, 'second'], // a few seconds
    [44.4, 'second'], // a few seconds
    [44.5, 'second'], // a minute
    [45, 'second'], // a minute
    [1, 'minute'], // a minute
    [89, 'second'], // a minute
    [89.4, 'second'], // a minute
    [89.5, 'second'], // a minute
    [90, 'second'], // 2 minutes
    [44, 'minute'], // 44 minutes
    [44.4, 'minute'],
    [44.5, 'minute'],
    [45, 'minute'], // an hour
    [1, 'hour'], // an hour
    [89, 'minute'], // an hour
    [89.4, 'minute'],
    [89.5, 'minute'],
    [90, 'minute'], // 2 hours
    [21, 'hour'], // 21 hours
    [21.4, 'hour'],
    [21.5, 'hour'],
    [22, 'hour'], // a day
    [1, 'day'], // a day
    [35, 'hour'], // a day
    [35.4, 'hour'],
    [35.5, 'hour'],
    [36, 'hour'], // 2 days
    [25, 'day'], // 25 days
    [26, 'day'], // a month
    [1, 'month'], // a month
    [45, 'day'], // a month
    [47, 'day'], // 2 month
    [10, 'month'], // 10 month
    [11, 'month'], // a year
    [1, 'year'], // a year
    [17, 'month'], // a year
    [18, 'month'] // 2 years
  ]

  T.forEach((t) => {
    expect(dayjs().from(dayjs().add(t[0], t[1]))).toBe(moment().from(moment().add(t[0], t[1])))
  })
  // withoutSuffix
  expect(dayjs().from(dayjs().add(3, 'year'), true)).toBe(moment().from(moment().add(3, 'year'), true))
  // past date
  expect(dayjs().from(dayjs().subtract(3, 'year'))).toBe(moment().from(moment().subtract(3, 'year')))
})

it('Time from now', () => {
  expect(dayjs().fromNow()).toBe(moment().fromNow())
  expect(dayjs().fromNow(true)).toBe(moment().fromNow(true))
})

it('Time to now', () => {
  expect(dayjs().toNow()).toBe(moment().toNow())
  expect(dayjs().toNow(true)).toBe(moment().toNow(true))
})

it('Time to X', () => {
  // withoutSuffix
  expect(dayjs().to(dayjs().add(3, 'year'), true)).toBe(moment().to(moment().add(3, 'year'), true))
  // past date
  expect(dayjs().to(dayjs().subtract(3, 'year'))).toBe(moment().to(moment().subtract(3, 'year')))
})

it('Locale Function', () => {
  // e.g. in ru locale, m: x minute require additional processing
  // and provides as a function instead of a string
  const str0 = '2020-01-06 15:53:00'
  const str = '2020-01-06 15:52:15'
  const result = dayjs(str0).locale('ru').to(str)
  expect(result).toEqual(expect.any(String))
})

// https://github.com/iamkun/dayjs/issues/646
it('Time from now with UTC', () => {
  dayjs.extend(utc)

  expect(dayjs.utc().fromNow()).toBe(moment.utc().fromNow())

  const currentTime = new Date()
  const currentTimestamp = currentTime.getTime()
  const currentTimestampAfter37hrs = currentTimestamp + (37 * 60 * 60 * 1000)

  let dutc = dayjs.utc(currentTimestampAfter37hrs)
  let mutc = moment.utc(currentTimestampAfter37hrs)

  expect(dutc.fromNow()).toBe(mutc.fromNow())

  // More precise
  const currentTimestampAfter36hrs = currentTimestamp + (36.0001 * 60 * 60 * 1000)
  dutc = dayjs.utc(currentTimestampAfter36hrs)
  mutc = moment.utc(currentTimestampAfter36hrs)

  expect(dutc.fromNow()).toBe(mutc.fromNow())
})
