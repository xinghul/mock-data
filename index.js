+ function(undefined) {
  "use strict";

  module.exports = {
    // models
    string : require("./lib/string"),
    date   : require("./lib/date"),
    integer: require("./lib/integer"),
    ipv4   : require("./lib/ipv4"),
    boolean: require("./lib/boolean"),

    // generator
    generate: require("./util/generator")
  };

}();
