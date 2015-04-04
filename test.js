+function (undefined) {
    "use strict";

    var rDate = require("./lib/ipv4")();
    rDate.params({format: "192.168.*.*"})

    var should = require("should");

    console.log(rDate.generate());
}();
