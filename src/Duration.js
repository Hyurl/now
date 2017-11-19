import {
  isNumber,
  daysToMonths,
  monthsToDays,
  absFloor,
  absCeil,
  SECOND,
  MINUTE,
  HOUR,
  DAY,
} from './utils/index.js';

const round = Math.round;
const thresholds = {
  ss: 44, // a few seconds to seconds
  s: 45, // seconds to minute
  m: 45, // minutes to hour
  h: 22, // hours to day
  d: 26, // days to month
  M: 11 // months to year
};

class Duration {
  constructor(val) {
    val || (val = 0);
    val = isNumber(parseInt(val, 10)) ? val : 0;
    this._data = {};
    this._milliSeconds = val;
    this.init();
  }

  init() {
    const millis = this._milliSeconds;
    let seconds;
    let minutes;
    let hours;
    let days;
    let months;
    let years;
    let monthsFromDays;


    this._data.milliSeconds = millis % SECOND;
    seconds = absFloor(millis / SECOND);
    this._data.seconds = seconds % 60;
    minutes = absFloor(millis / MINUTE);
    this._data.minutes = minutes % 60;
    hours = absFloor(millis / HOUR);
    this._data.hours = hours % 24;
    days = absFloor(hours / 24);

    monthsFromDays = absFloor(daysToMonths(days));
    months = monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    years = absFloor(months / 12);
    months = months % 12;

    this._data.days = days;
    this._data.months = days;
    this._data.years = days;
  }

  get value() {
    return this._milliSeconds;
  }

  valueOf() {
    return this.value;
  }

  abs() {
    const mathAbs = Math.abs;
    const data = this._data;

    this._milliSeconds = mathAbs(this._milliSeconds);

    this._data.milliSeconds = mathAbs(data.milliSeconds);
    this._data.seconds = mathAbs(data.seconds);
    this._data.minutes = mathAbs(data.minutes);
    this._data.hours = mathAbs(data.hours);
    this._data.days = mathAbs(data.days);
    this._data.months = mathAbs(data.months);
    this._data.years = mathAbs(data.years);

    return this;
  }

  // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
  substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }

  relativeTime(withoutSuffix, locale) {
    this.abs();
    const seconds = this.seconds();
    const minutes = this.minutes();
    const hours = this.hours();
    const days = this.days();
    const months = this.months();
    const years = this.years();


    let a = seconds <= thresholds.ss && ['s', seconds] ||
      seconds < thresholds.s && ['ss', seconds] ||
      minutes <= 1 && ['m'] ||
      minutes < thresholds.m && ['mm', minutes] ||
      hours <= 1 && ['h'] ||
      hours < thresholds.h && ['hh', hours] ||
      days <= 1 && ['d'] ||
      days < thresholds.d && ['dd', days] ||
      months <= 1 && ['M'] ||
      months < thresholds.M && ['MM', months] ||
      years <= 1 && ['y'] || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +this > 0;
    a[4] = locale;
    return this.substituteTimeAgo.apply(null, a);
  }

  human(context, withSuffix) {
    const locale = context.localeData();
    let output = this.relativeTime(!withSuffix, locale);

    if (withSuffix) {
      output = locale.pastFuture(+this, output);
    }
    return locale.postformat ? locale.postformat(output) : output;
  }

  computeMonth() {
    return daysToMonths(this.value / DAY);
  }

  years() {
    return round(this.computeMonth() / 12);
  }

  months() {
    return round(this.computeMonth());
  }

  weeks() {
    return round(this.value / DAY / 7);
  }

  days() {
    return round(this.value / DAY);
  }

  hours() {
    return round(this.value / HOUR);
  }

  minutes() {
    return round(this.value / MINUTE);
  }

  seconds() {
    return round(this.value / SECOND);
  }

  milliSeconds() {
    return this.value;
  }
}

export default Duration;