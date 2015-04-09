+ function(undefined) {
  "use strict";

  var stream = require("stream")
  ,   util = require("util");

  var Readable = stream.Readable || require("readable-stream").Readable;
  util.inherits(Generator, Readable);

  function Generator(options) {
    // turn on objectMode by default
    if (options.objectMode !== false) {
      options.objectMode = true;
    }

    this._source = null;
    this._count = options.count || 10;

    switch (options.type.toLowerCase()) {
      case "string":
        this._source = require("../lib/string")();
        break;
      case "date":
        this._source = require("../lib/date")();
        break;
      case "integer":
        this._source = require("../lib/integer")();
        break;
      case "ipv4":
        this._source = require("../lib/ipv4")();
        break;
      case "boolean":
        this._source = require("../lib/boolean")();
        break;
      default:
        this._source = require("../lib/string")();
        break;
    }
    // set params for specific source
    this._source.params(options.params);

    Readable.call(this, options);
  }

  Generator.prototype._read = function() {
    if (this._count <= 0) {
      return this.push(null);
    }

    this.push(this._source.generate());

    this._count--;
  };

  module.exports = function() {
    var args = [].slice.call(arguments)
    ,   options
    ,   __callback;

    if (args.length === 2) {
      options = args[0];
      __callback = args[1];
    } else if (args.length === 1) {
      if (typeof args[0] === "function") {
        __callback = args[0];
      } else {
        options = args[0];
      }
    }

    if (!options) {
      options = {};
    }

    var generator = new Generator(options);

    if (__callback) {
      var _data = [];
      generator.on("data", function(data) {
        _data.push(data);
      });
      generator.on("end", function() {
        return __callback(null, options.objectMode ? _data : _data.join(''));
      });
      generator.on("error", __callback);
    }

    return generator;
  };

}();
