+function (undefined) {
    "use strict";

    function isNumeric(obj) {
        return !Array.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
    }

    function RandomInteger() {
        var args = [].slice.call(arguments);
        return new RandomInteger.prototype.init(args);
    }

    RandomInteger.prototype = {
        _start: null,
        _end: null,

        _init: function(args) {
            this._start = isNumeric(args[0]) ? args[0] : Number.MIN_SAFE_INTEGER;
            this._end   = isNumeric(args[1]) ? args[1] : Number.MAX_SAFE_INTEGER;
            return this;
        },

        setParams: function(options) {
            options = options || {};

            this._start = isNumeric(options.start) ? parseInt(options.start) : this._start;
            this._end   = isNumeric(options.end) ? parseInt(options.end) : this._end;
        },

        getParams: function() {
            return {
                start  : this._start,
                end    : this._end
            };
        },

        generate: function() {

        }
    };

    RandomInteger.prototype._init.prototype = RandomInteger.prototype;

    module.exports = RandomInteger;

}();