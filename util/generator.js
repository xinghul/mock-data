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
        
        this.source = null;
        this.count = options.count || 10;

        switch (options.type) {
            case "date":
                this.source = require("../lib/date")();
                break;
            default: 
                this.source = require("../lib/date")();
                break;
        }
        Readable.call(this, options);
    }

    Generator.prototype._read = function() {
        if (this.count <= 0) {
            return this.push(null);
        }

        this.push(this.source._generate());

        this.count --;
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