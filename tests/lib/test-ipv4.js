+ function() {
  "use strict";

  var should = require("should");

  var rIpv4 = require("../../").generic.ipv4
  ,   utils = require("../../util/utils");

  describe("Test ipv4", function() {
    var ip, ip2;
    describe("Basic tests", function() {
      before(function() {
        ip = rIpv4();
      });
      it("should exist and is a function", function(done) {
        should.exist(rIpv4) && rIpv4.should.be.a.Function;

        done();
      });
      it("should be able to set params by construct and get params directly", function(done) {
        ip = rIpv4("192.168.*.*");

        (ip.format).should.equal("192.168.*.*");

        done();
      });
      it("should be able to get params by params()", function(done) {
        should.exist(ip.params) && ip.params.should.be.a.Function;

        var params = ip.params();

        params.should.be.an.Object;
        should(params.format).be.a.String;

        done();
      });
      it("should be able to set params by params()", function(done) {
        should.exist(ip.params) && ip.params.should.be.a.Function;

        var newParams = {
          format: "10.0.0.1"
        };

        var afterSetParams = ip.params(newParams);

        afterSetParams.should.be.an.Object;
        should(afterSetParams.format).equal(newParams.format);

        done();
      });
      it("should generate a new object each time calling rInt()", function(done) {
        ip = rIpv4("10.0.0.1");
        ip2 = rIpv4("10.0.10.1");

        should(ip.format).not.equal(ip2.format);

        done();
      });
    });

    describe("Advance tests", function() {
      var ip;
      before(function() {
        ip = rIpv4();
      });
      it("should expose function generate()", function(done) {
        should.exist(ip.generate) && ip.generate.should.be.a.Function;

        done();
      });
      it("should generate valid ipv4 addresses", function(done) {
        for (var i = 0, result; i < 100; i++) {
          result = ip.generate();
          utils.isValidIpv4(result).should.be.true;
        }

        done();
      });
      it("should generate ipv4 addresses in range", function(done) {
        ip.params({
          format: "192.168.0.*"
        });

        var start = utils.ipv4ToInt("192.168.0.0"),
          end = utils.ipv4ToInt("192.168.0.255");
        for (var i = 0, result; i < 100; i++) {
          result = ip.generate();
          utils.isValidIpv4(result).should.be.true;

          should(utils.ipv4ToInt(result)).not.greaterThan(end).and.not.lessThan(start);
        }

        done();
      });
    });
  });
}();
