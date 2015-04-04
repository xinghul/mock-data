+function (undefined) {
    "use strict";

    var rStr = require("./lib/string");

    var str = rStr();

    console.log(str.params({
      include: "a#",
      maxLength: 48
    }));
}();
