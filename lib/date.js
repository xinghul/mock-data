+function (undefined) {
    "use strict";

    var moment = require("moment");

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function RandomDate() {
        return new RandomDate.prototype._init();
    }

    RandomDate.prototype = {
        _start: null,
        _end: null,
        _isUTC: null,
        _format: null,

        _init: function() {
            this._start = 1980;
            this._end = 2015;
            this._isUTC = false;

            return this;
        },

        _generate: function() {
            var year    = Math.floor(Math.random() * (this._end - this._start + 1)) + this._start
            ,   month   = Math.floor(Math.random() * 12)
            ,   day     = Math.floor(Math.random() * daysInMonth(year, month))
            ,   timeObj = {
                y : year,
                M : month,
                d : day,
                h : Math.floor(Math.random() * 24),
                m : Math.floor(Math.random() * 60),
                s : Math.floor(Math.random() * 60),
                ms: Math.floor(Math.random() * 1000),
            };
            var ret = this._isUTC ? moment.utc(timeObj) : moment(timeObj);

            return this._format === null ? ret.format() : ret.format(this._format);
        },

        params: function(options) {
            if (typeof options === "object") {
                options.start  = typeof options.start === "number" ? options.start : this._start;
                options.end    = typeof options.end === "number" ? options.end : this._end;
                options.format = typeof options.format === "string" ||
                                        options.format === null ? options.format : this._format; 

                this._start  = options.start;
                this._end    = options.end >= options.start ? options.end : options.start;
                this._isUTC  = !! options.isUTC;
                this._format = options.format;
            }

            return {
                start  : this._start,
                end    : this._end,
                isUTC  : this._isUTC,
                format : this._format
            };
        },

        generate: function() {
            return this._generate();
        }
        
    };

    RandomDate.prototype._init.prototype = RandomDate.prototype;

    module.exports = RandomDate;
}();