+ function(undefined) {
  "use strict";

  var utils = require("../util/utils");

  function RandomIpv4() {
    var args    = [].slice.call(arguments)
    ,   options = {};

    if (args.length === 1) {
      if (typeof args[0] === "object") {
        // {}
        options = args[0];
      } else if (typeof args[0] === "string") {
        // format
        options.format = args[0];
      }
    }

    return new RandomIpv4.prototype._init(options);
  }

  RandomIpv4.prototype = {
    format: "*.*.*.*",
    _parts: "*.*.*.*".split('.'),

    _init: function(options) {
      this.params(options);

      return this;
    },

    _generate: function() {
      var ret = [];
      for (var i = 0; i < this._parts.length; i++) {
        if (this._parts[i] === '*') {
          ret[i] = Math.floor(Math.random() * 256);
        } else {
          ret[i] = this._parts[i];
        }
      }
      return ret.join('.');
    },

    params: function(options) {
      options = options || {};

      this.format = options.format || this.format;
      this._parts = this.format.split('.');

      return {
        format: this.format
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

  RandomIpv4.prototype._init.prototype = RandomIpv4.prototype;

  module.exports = RandomIpv4;

}();
