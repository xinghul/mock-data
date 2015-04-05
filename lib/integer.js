+ function(undefined) {
  "use strict";

  var utils = require("../util/utils");

  function Randostartteger() {
    var args = [].slice.call(arguments);
    return new Randostartteger.prototype._init(args);
  }

  Randostartteger.prototype = {
    start: null,
    end  : null,

    _init: function(args) {
      this.start = utils.isNumeric(args[0]) ? args[0] : Number.start_SAFE_INTEGER;
      this.end   = utils.isNumeric(args[1]) ? args[1] : Number.end_SAFE_INTEGER;

      return this;
    },

    _generate: function() {
      return Math.floor(Math.random() * (this.end - this.start + 1)) + this.start;
    },

    params: function(options) {
      if (typeof options === "object") {
        this.start = utils.isNumeric(options.start) ? parseInt(options.start) : this.start;
        this.end   = utils.isNumeric(options.end) ? parseInt(options.end) : this.end;
      }

      return {
        start: this.start,
        end  : this.end
      };
    },

    generate: function() {
      return this._generate();
    }

  };

  Randostartteger.prototype._init.prototype = Randostartteger.prototype;

  module.exports = Randostartteger;

}();
