+ function(undefined) {
  "use strict";

  var moment = require("moment");

  function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  }

  function RandomDate() {
    return new RandomDate.prototype._init();
  }

  RandomDate.prototype = {
    start: null,
    end: null,
    isUTC: null,
    format: null,

    _init: function() {
      this.start = 1980;
      this.end = 2015;
      this.isUTC = false;

      return this;
    },

    _generate: function() {
      var year = Math.floor(Math.random() * (this.end - this.start + 1)) + this.start,
        month = Math.floor(Math.random() * 12),
        day = Math.floor(Math.random() * daysInMonth(year, month)),
        timeObj = {
          y: year,
          M: month,
          d: day,
          h: Math.floor(Math.random() * 24),
          m: Math.floor(Math.random() * 60),
          s: Math.floor(Math.random() * 60),
          ms: Math.floor(Math.random() * 1000),
        };
      var ret = this.isUTC ? moment.utc(timeObj) : moment(timeObj);

      return this.format === null ? ret.format() : ret.format(this.format);
    },

    params: function(options) {
      if (typeof options === "object") {
        options.start = typeof options.start === "number" ? options.start : this.start;
        options.end = typeof options.end === "number" ? options.end : this.end;
        options.format = typeof options.format === "string" ||
          options.format === null ? options.format : this.format;

        this.start = options.start;
        this.end = options.end >= options.start ? options.end : options.start;
        this.isUTC = !!options.isUTC;
        this.format = options.format;
      }

      return {
        start: this.start,
        end: this.end,
        isUTC: this.isUTC,
        format: this.format
      };
    },

    generate: function() {
      return this._generate();
    }

  };

  RandomDate.prototype._init.prototype = RandomDate.prototype;

  module.exports = RandomDate;
}();
