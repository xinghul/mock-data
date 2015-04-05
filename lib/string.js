+ function(undefined) {
  "use strict";

  var utils = require("../util/utils");


  function filterInclude(_include) {
    if (typeof _include !== "string" || _include.length === 0) {
      return "";
    }

    var ret = "";
    if (_include.indexOf("a") !== -1) {
      ret += "a";
    }
    if (_include.indexOf("A") !== -1) {
      ret += "A";
    }
    if (_include.indexOf("#") !== -1) {
      ret += "#";
    }
    if (_include.indexOf("!") !== -1) {
      ret += "!";
    }

    return ret;
  }
  function RandomString() {
    var args    = [].slice.call(arguments)
    ,   options = {};

    if (args.length === 1) {
      if (typeof args[0] === "object") {
        // {}
        options = args[0];
      } else if (typeof args[0] === "string") {
        // include
        options.include = args[0];
      } else if (typeof args[0] === "number") {
        // length
        options.maxLength = args[0];
      }
    } else if (args.length === 2) {
      if (typeof args[1] === "string") {
        // length, include
        options.include   = args[1];
        options.maxLength = args[0];
      } else {
        // length, length
        options.minLength = args[0];
        options.maxLength = args[1];
      }

    } else if (args.length === 3) {
      options.minLength = args[0];
      options.maxLength = args[1];
      options.include   = args[2];
    }

    return new RandomString.prototype._init(options);
  }

  RandomString.prototype = {
    include: "aA#!",
    maxLength: 32,
    minLength: 16,
    _mask: null,

    _init: function(options) {
      this.params(options);

      return this;
    },

    _generate: function() {
      var length = Math.floor(
        Math.random() * (this.maxLength - this.minLength + 1)
      ) + this.minLength;

      var ret = "";
      for (var i = 0; i < length; i ++) {
        ret += this._mask[Math.floor(Math.random() * this._mask.length)];
      }

      return ret;
    },

    _updateMask: function() {
      this._mask = "";

      if (this.include.indexOf('a') !== -1) {
        this._mask += "abcdefghijklmnopqrstuvwxyz";
      }
      if (this.include.indexOf('A') !== -1) {
        this._mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if (this.include.indexOf('#') !== -1) {
        this._mask += "0123456789";
      }
      if (this.include.indexOf('!') !== -1) {
        this._mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
      }
    },

    params: function(options) {
      options = options || {};

      this.maxLength = options.maxLength || this.maxLength;
      this.minLength = options.minLength || this.minLength;
      this.include   = filterInclude(options.include) || this.include;

      this._updateMask();

      return {
        include   : this.include,
        maxLength : this.maxLength,
        minLength : this.minLength
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

  RandomString.prototype._init.prototype = RandomString.prototype;

  module.exports = RandomString;

}();
