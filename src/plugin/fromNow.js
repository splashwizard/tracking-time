import * as C from '../constant'

export default (o, c, d) => {
  const proto = c.prototype
  d.en.relativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    min: 'a minute',
    mins: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
  proto.fromNow = function (withoutSuffix) {
    return this.from(d(), withoutSuffix)
  }
  proto.from = function (input, withoutSuffix) {
    const loc = this.$locale().relativeTime
    const T = [
      { l: 's', r: 44, d: C.S },
      { l: 'min', r: 89 },
      { l: 'mins', r: 44, d: C.MIN },
      { l: 'h', r: 89 },
      { l: 'hh', r: 21, d: C.H },
      { l: 'd', r: 35 },
      { l: 'dd', r: 25, d: C.D },
      { l: 'M', r: 46 },
      { l: 'MM', r: 10, d: C.M },
      { l: 'y', r: 17 },
      { l: 'yy', d: C.Y }
    ]
    const Tl = T.length
    let result
    let out

    for (let i = 0; i < Tl; i += 1) {
      const t = T[i]
      if (t.d) result = this.diff(input, t.d, true)
      const abs = Math.ceil(Math.abs(result))
      if (abs <= t.r || !t.r) {
        out = loc[t.l].replace('%d', abs)
        break
      }
    }
    if (withoutSuffix) return out
    return (result > 0 ? loc.future : loc.past).replace('%s', out)
  }
}
