+ function(undefined) {
  "use strict";

  function RandomBoolean() {
    var args    = [].slice.call(arguments)
    ,   options = {};

    if (args.length === 1) {
      if (typeof args[0] === "object") {
        // {}
        options = args[0];
      } else if (typeof args[0] === "number") {
        // format
        options.trueOdds = args[0];
      }
    }

    return new RandomBoolean.prototype._init(options);
  }

  RandomBoolean.prototype = {
    trueOdds: 0.5,

    _init: function(options) {
      this.params(options);

      return this;
    },

    _generate: function() {
      return Math.random() < this.trueOdds;
    },

    params: function(options) {
      options = options || {};

      this.trueOdds = options.trueOdds || this.trueOdds;

      return {
        trueOdds: this.trueOdds
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

  RandomBoolean.prototype._init.prototype = RandomBoolean.prototype;

  module.exports = RandomBoolean;

}();
