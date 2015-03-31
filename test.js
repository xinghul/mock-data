+function (undefined) {
    "use strict";

    var stream = require("stream")
    ,   util   = require("util");

    var Transform = stream.Transform;

    util.inherits(ReadStream, Transform);

    function ReadStream() {
        this.count = 10;
        Transform.call(this, {objectMode: true});
    }

    ReadStream.prototype._transform = function(chunk, encoding, callback) {
        if (this.count <= 0) {
            return this.push(null);
        }

        this.push(1);
        this.count --;
        callback();
    };

    ReadStream.prototype.createReadableStream = function() {
        
    };

    var readStream = new ReadStream();

    // readStream.createReadableStream();

    readStream.on("data", function (data) {
        console.log("received", data);
    });
    readStream.on("end", function() {
        console.log("end");
    });

}();