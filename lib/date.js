+function (undefined) {
    "use strict";

    var moment = require("moment");

    var start
    ,   end
    ,   isUTC
    ,   format;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function RandomDate() {
        start  = 1980;
        end    = 2015;
        isUTC  = false;
        format = null;
    }

    RandomDate.prototype.setParams = function(options) {
        options = options || {};

        options.start  = typeof options.start === "number" ? options.start : start;
        options.end    = typeof options.end === "number" ? options.end : end;
        options.format = typeof options.format === "string" ? options.format : format; 

        start  = options.start;
        end    = options.end >= options.start ? options.end : options.start;
        isUTC  = !! options.isUTC;
        format = options.format;
    };

    RandomDate.prototype.getParams = function() {
        return {
            start  : start,
            end    : end,
            isUTC  : isUTC,
            format : format
        };
    };

    RandomDate.prototype.generate = function() {
        var year    = Math.floor(Math.random() * (end - start + 1)) + start
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
        var ret = isUTC ? moment.utc(timeObj) : moment(timeObj);

        return format === null ? ret.format() : ret.format(format);
    };

    module.exports = new RandomDate();

}();