+function(undefined) {
    "use strict";

    module.exports = {
        generic: {
            date: require("./lib/date"),
            integer: require("./lib/integer"),
            ipv4: require("./lib/ipv4")
        },
        generate: require("./util/generator")
    };
    
}();