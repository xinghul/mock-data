+ function() {
  "use strict";

  var should = require("should");

  var rIpv4 = require("../../").ipv4
  ,   utils = require("../../util/utils");

  describe("Test ipv4", function() {
    var ip, ip1;
    describe("Basic tests", function() {
      it("should exist and is a function", function(done) {
        should.exist(rIpv4) && rIpv4.should.be.a.Function;

        done();
      });
      it("should be able to set params by construct and get params directly", function(done) {
        ip = rIpv4();
        (ip.format).should.equal("*.*.*.*");

        ip = rIpv4("192.168.*.*");
        (ip.format).should.equal("192.168.*.*");

        ip = rIpv4({format: "192.168.*.2"});
        (ip.format).should.equal("192.168.*.2");

        done();
      });
      it("should be able to get correct params by params()", function(done) {
        ip = rIpv4();
        should.exist(ip.params) && ip.params.should.be.a.Function;

        var params = ip.params();
        params.should.be.an.Object;
        should(params.format).equal("*.*.*.*");

        ip = rIpv4("10.0.*.1");

        var params = ip.params();
        params.should.be.an.Object;
        should(params.format).equal("10.0.*.1");

        done();
      });
      it("should be able to set params by params()", function(done) {
        ip = rIpv4();
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
        ip  = rIpv4("10.0.0.1");
        ip1 = rIpv4("10.0.10.1");

        should(ip.format).not.equal(ip1.format);

        done();
      });
    });

    describe("Advance tests", function() {
      it("should expose function generate()", function(done) {
        ip = rIpv4();
        should.exist(ip.generate) && ip.generate.should.be.a.Function;

        done();
      });
      it("should generate valid ipv4 addresses with given params, in three different ways", function(done) {
        ip = rIpv4("192.168.0.*");

        var start = utils.ipv4ToInt("192.168.0.0")
        ,   end   = utils.ipv4ToInt("192.168.0.255");

        for (var i = 0, result; i < 33; i ++) {
          result = ip.generate();
          utils.isValidIpv4(result).should.be.true;

          should(utils.ipv4ToInt(result)).not.greaterThan(end).and.not.lessThan(start);
        }

        var ret = ip.generate(33);
        should(ret).be.an.Array && should(ret.length).equal(33);
        for (var i = 0; i < ret.length; i ++) {
          utils.isValidIpv4(ret[i]).should.be.true;

          should(utils.ipv4ToInt(ret[i])).not.greaterThan(end).and.not.lessThan(start);
        }

        ip.generate(33, function(err, data) {
          should(data).be.an.Array && should(data.length).equal(33);
          for (var i = 0; i < data.length; i ++) {
            utils.isValidIpv4(data[i]).should.be.true;

            should(utils.ipv4ToInt(data[i])).not.greaterThan(end).and.not.lessThan(start);
          }

          done();
        });
      });
    });
  });
}();
