+ function(undefined) {
  "use strict";

  var utils = require("../util/utils");

  function RandomInteger() {
    var args    = [].slice.call(arguments)
    ,   options = {};

    if (args.length === 1) {
      if (typeof args[0] === "object") {
        // {}
        options = args[0];
      }
    } else if (args.length === 2) {
      // start, end
      options.start = args[0];
      options.end   = args[1];
    }

    return new RandomInteger.prototype._init(options);
  }

  RandomInteger.prototype = {
    start: Number.MIN_SAFE_INTEGER || -2000000000,
    end  : Number.MAX_SAFE_INTEGER ||  2000000000,

    _init: function(options) {
      this.params(options);

      return this;
    },

    _generate: function() {
      return Math.floor(Math.random() * (this.end - this.start + 1)) + this.start;
    },

    params: function(options) {
      options = options || {};

      this.start = utils.isNumeric(options.start) ? options.start : this.start;
      this.end   = utils.isNumeric(options.end) ? options.end : this.end;

      return {
        start: this.start,
        end  : this.end
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

  RandomInteger.prototype._init.prototype = RandomInteger.prototype;

  module.exports = RandomInteger;

}();
