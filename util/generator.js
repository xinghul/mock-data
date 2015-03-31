+function (undefined) {
    "use strict";

    var stream = require("stream")
    ,   util   = require("util");

    var Readable = stream.Readable;
    util.inherits(Generator, Readable);

    function Generator(options) {
        // turn on objectMode by default
        if (options.objectMode === undefined) {
            options.objectMode = true;
        }

        this._source = null;
        this._count = options.count || 10;

        switch (options.type) {
            case "date":
                this._source = require("../lib/date")();
                break;
            default: 
                this._source = require("../lib/date")();
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

        this.push(this._source._generate());

        this._count --;
    };

    module.exports = function() {
        var args = [].slice.call(arguments)
        ,   options
        ,   _callback;

        if (args.length === 2) {
            options = args[0];
            _callback = args[1];
        } else if (args.length === 1) {
            if (typeof args[0] === "function") {
                _callback = args[0];
            } else {
                options = args[0];
            }
        }

        if (!options) {
            options = {};
        }

        var generator = new Generator(options);

        if (_callback) {
            var _data = [];
            generator.on("data", function (data) {
                _data.push(data);
            });
            generator.on("end", function() {
                return _callback(null, options.objectMode ? _data : _data.join(''));
            });
            generator.on("error", _callback);
        }

        return generator;
    };

}();