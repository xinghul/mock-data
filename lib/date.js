+ function(undefined) {
  "use strict";

  var moment = require("moment");

  function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  }

  function RandomDate() {
    var args    = [].slice.call(arguments)
    ,   options = {};

    if (args.length === 1) {
      if (typeof args[0] === "object") {
        // {}
        options = args[0];
      } else if (typeof args[0] === "boolean") {
        // isUTC
        options.isUTC = args[0];
      }
    } else if (args.length === 2) {
      // start, end
      options.start = args[0];
      options.end   = args[1];
    } else if (args.length === 3) {
      // start, end, format
      options.start  = args[0];
      options.end    = args[1];
      options.format = args[2];
    } else if (args.length === 4) {
      // start, end, format
      options.start  = args[0];
      options.end    = args[1];
      options.format = args[2];
      options.isUTC  = args[3];
    }

    return new RandomDate.prototype._init(options);
  }

  RandomDate.prototype = {
    start : 1980,
    end   : 2015,
    format: null,
    isUTC : false,

    _init: function(options) {
      this.params(options);

      return this;
    },

    _generate: function() {
      var year    = Math.floor(
                      Math.random() * (this.end - this.start + 1)
                    ) + this.start
      ,   month   = Math.floor(Math.random() * 12)
      ,   day     = Math.floor(Math.random() * daysInMonth(year, month))
      ,   timeObj = {
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
      options = options || {};

      this.start  = options.start || this.start;
      this.end    = options.end || this.end;
      this.format = options.format || this.format;
      this.isUTC  = options.isUTC === true ? true : false;

      return {
        start : this.start,
        end   : this.end,
        format: this.format,
        isUTC : this.isUTC
      };
    },

    generate: function(count, __callback) {
      if (count === undefined) {
        return this._generate();
      } else {
        var data = [];
        for (var i = 0; i < count; i ++) {
          data.push(this._generate());
        }
        if (typeof __callback === "function") {
          return __callback(null, data);
        } else {
          return data;
        }
      }
    }

  };

  RandomDate.prototype._init.prototype = RandomDate.prototype;

  module.exports = RandomDate;
}();
