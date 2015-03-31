+function(undefined) {
    "use strict";

    module.exports = {
        generic: {
            date: require("./lib/date"),
            integer: require("./lib/integer")
        },
        generate: require("./util/generator")
    };
    
}();