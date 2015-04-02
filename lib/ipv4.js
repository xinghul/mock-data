+function (undefined) {
    "use strict";

    var utils = require("../util/utils");

    function RandomIpv4() {
        var args = [].slice.call(arguments);
        return new RandomIpv4.prototype._init(args);
    }

    RandomIpv4.prototype = {
        _format: null,
        _parts: null,

        _init: function(args) {
            this._format = utils.isIpv4Format(args[0]) ? args[0] : "*.*.*.*";
            this._parts  = this._format.split('.');

            return this;
        },

        _generate: function() {
            var ret = [];
            for (var i = 0; i < this._parts.length; i ++) {
                if (this._parts[i] === '*') {
                    ret[i] = Math.floor(Math.random() * 256);
                } else {
                    ret[i] = this._parts[i];
                }
            }
            return ret.join('.');
        },

        params: function(options) {
            if (typeof options === "object") {
                this._format = utils.isIpv4Format(options.format) ? options.format : this._format;
                this._parts  = this._format.split('.');
            }

            return {
                format : this._format
            };
        },

        generate: function() {
            return this._generate();
        }

    };

    RandomIpv4.prototype._init.prototype = RandomIpv4.prototype;

    module.exports = RandomIpv4;

}();