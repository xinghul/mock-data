+ function(undefined) {
  "use strict";

  var utils = require("../util/utils");

  function RandomString() {
    var args = [].slice.call(arguments);
    return new RandomString.prototype._init(args);
  }

  RandomString.prototype = {
    _include: null,
    _length: null,
    _mask: null,

    _init: function(args) {
      this.params(args);

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
      if (typeof options === "object") {
        this._format = utils.isIpv4Format(options.format) ? options.format : this._format;
        this._parts = this._format.split('.');
      }

      return {
        format: this._format
      };
    },

    generate: function() {
      return this._generate();
    }

  };

  RandomString.prototype._init.prototype = RandomString.prototype;

  module.exports = RandomString;

}();
