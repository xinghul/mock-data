+ function(undefined) {
  "use strict";

  var utils = require("../util/utils");

  function RandomInteger() {
    var args = [].slice.call(arguments);
    return new RandomInteger.prototype._init(args);
  }

  RandomInteger.prototype = {
    start: null,
    end: null,

    _init: function(args) {
      this.start = utils.isNumeric(args[0]) ? args[0] : Number.MIN_SAFE_INTEGER;
      this.end = utils.isNumeric(args[1]) ? args[1] : Number.MAX_SAFE_INTEGER;

      return this;
    },

    _generate: function() {
      return Math.floor(Math.random() * (this.end - this.start + 1)) + this.start;
    },

    params: function(options) {
      if (typeof options === "object") {
        this.start = utils.isNumeric(options.start) ? parseInt(options.start) : this.start;
        this.end = utils.isNumeric(options.end) ? parseInt(options.end) : this.end;
      }

      return {
        start: this.start,
        end: this.end
      };
    },

    generate: function() {
      return this._generate();
    }

  };

  RandomInteger.prototype._init.prototype = RandomInteger.prototype;

  module.exports = RandomInteger;

}();
