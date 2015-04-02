+function (undefined) {
    "use strict";

    var utils = require("../util/utils");

    function RandomInteger() {
        var args = [].slice.call(arguments);
        return new RandomInteger.prototype._init(args);
    }

    RandomInteger.prototype = {
        _start: null,
        _end: null,

        _init: function(args) {
            this._start = utils.isNumeric(args[0]) ? args[0] : Number.MIN_SAFE_INTEGER;
            this._end   = utils.isNumeric(args[1]) ? args[1] : Number.MAX_SAFE_INTEGER;
            
            return this;
        },

        _generate: function() {
            return Math.floor(Math.random() * (this._end - this._start + 1)) + this._start;
        },

        params: function(options) {
            if (typeof options === "object") {
                this._start = utils.isNumeric(options.start) ? parseInt(options.start) : this._start;
                this._end   = utils.isNumeric(options.end) ? parseInt(options.end) : this._end;
            }

            return {
                start  : this._start,
                end    : this._end
            };
        },

        generate: function() {
            return this._generate();
        }

    };

    RandomInteger.prototype._init.prototype = RandomInteger.prototype;

    module.exports = RandomInteger;

}();