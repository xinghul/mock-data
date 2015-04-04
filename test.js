+function (undefined) {
    "use strict";

    var rStr = require("./lib/string");

    var str = rStr();

    var should = require("should");

    console.log(should.exist(undefined));
}();
