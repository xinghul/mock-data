+function (undefined) {
    "use strict";

    var rInt = require("./lib/integer");

    var rInt1 = rInt(0, 123);

    // console.log(rInt1._start);

    console.log(rInt1.getParams());

    // rInt1.setParams({start: 0});

    // console.log(rInt1.getParams());

    var rInt2 = rInt();

    console.log(rInt2.getParams());
    console.log(rInt1.getParams());

    rInt1.setParams({end: 100});
    console.log(rInt2.getParams());
    console.log(rInt1.getParams());

    // var rDate1 = require("./lib/date")();
    // console.log(rDate1.getParams());
    // rDate1.setParams({start: 0});
    // console.log(rDate1.getParams());
    // var rDate2 = require("./lib/date")();
    // console.log(rDate2.getParams());
    // console.log(rDate1.getParams());

}();