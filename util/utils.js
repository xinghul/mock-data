+ function(undefined) {
  "use strict";

  var utils = {
    isNumeric: function(obj) {
      return !Array.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
    },
    isValidString: function(str, _include) {
      if (_include === "") {
        _include = "aA#!";
      }

      if (typeof str !== "string") {
        return false;
      }

      // we don't generate string contains white spaces
      if (str.indexOf(' ') !== -1) {
        return false;
      }

      if (_include.indexOf('a') !== -1) {
        str = str.replace(/[a-z]+/g, '');
      }
      if (_include.indexOf('A') !== -1) {
        str = str.replace(/[A-Z]+/g, '');
      }
      if (_include.indexOf('#') !== -1) {
        str = str.replace(/[0-9]+/g, '');
      }
      if (_include.indexOf('!') !== -1) {
        str = str.replace(/[^a-zA-Z0-9]+/g, '');
      }

      return str.length === 0;
    },
    isIpv4Format: function(format) {
      if (typeof format !== "string") {
        return false;
      }

      var parts = format.split('.');
      if (parts.length !== 4) {
        return false;
      }
      for (var i = 0; i < parts.length; i++) {
        if (parts[i] === "*" ||
          utils.isNumeric(parts[i]) && (parseInt(parts[i]) < 256 && parseInt(parts[i]) >= 0)) {
          continue;
        }
        return false;
      }
      return true;
    },
    isValidIpv4: function(ipv4) {
      if (!utils.isIpv4Format(ipv4)) {
        return false;
      }
      if (ipv4.indexOf('*') !== -1) {
        return false;
      }
      return true;
    },
    ipv4ToInt: function(ipv4) {
      if (!utils.isValidIpv4(ipv4)) {
        throw new Error("input is NOT valid ipv4!");
      }
      var parts = ipv4.split('.'),
        ret = 0;
      for (var i = 0; i < parts.length; i++) {
        ret += parts[i] * Math.pow(256, 3 - i);
      }
      return ret;
    },
    intToIpv4: function(integer) {
      if (!utils.isNumeric(integer)) {
        return false;
      }
      integer = parseInt(integer);

      if (integer > Math.pow(256, 4) - 1 ||
        integer < 0) {
        throw new Error("input is NOT a valid integer for ipv4")
      }

      var ret = [];
      for (var i = 0; i < 4; i++) {
        ret[i] = Math.floor((integer % Math.pow(256, 4 - i)) / Math.pow(256, 3 - i));
      }

      return ret.join('.');
    }
  };

  module.exports = utils;

}();
