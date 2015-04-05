+ function() {
  "use strict";

  var should = require("should");

  var utils = require("../../util/utils")
  ,   rStr  = require("../../").string;

  describe("Test string", function() {
    var str, str1;
    describe("Basic tests", function() {
      it("should exist and is a function", function(done) {
        should.exist(rStr.should) && rStr.should.be.a.Function;

        done();
      });
      it("should be able to set params by construct and get params directly", function(done) {
        str = rStr();
        (str.include).should.equal("aA#!");
        (str.maxLength).should.equal(32);
        (str.minLength).should.equal(16);

        str = rStr(64, "aA!");
        (str.include).should.equal("aA!");
        (str.maxLength).should.equal(64);
        (str.minLength).should.equal(16);

        str = rStr("a#!");
        (str.include).should.equal("a#!");
        (str.maxLength).should.equal(32);
        (str.minLength).should.equal(16);

        str = rStr(36);
        (str.include).should.equal("aA#!");
        (str.maxLength).should.equal(36);
        (str.minLength).should.equal(16);

        str = rStr(8, 36);
        (str.include).should.equal("aA#!");
        (str.maxLength).should.equal(36);
        (str.minLength).should.equal(8);

        str = rStr(8, 72, "asdA$");
        (str.include).should.equal("aA");
        (str.maxLength).should.equal(72);
        (str.minLength).should.equal(8);

        str = rStr({maxLength: 34, minLength: 14});
        (str.include).should.equal("aA#!");
        (str.maxLength).should.equal(34);
        (str.minLength).should.equal(14);

        str = rStr({include: "a#", maxLength: 36, minLength: 12});
        (str.include).should.equal("a#");
        (str.maxLength).should.equal(36);
        (str.minLength).should.equal(12);

        done();
      });
      it("should be able to get correct params by params()", function(done) {
        str = rStr();

        should.exist(str.params) && str.params.should.be.a.Function;
        var params = str.params();

        params.should.be.an.Object;
        should(params.include).equal("aA#!");
        should(params.maxLength).equal(32);
        should(params.minLength).equal(16);

        str = rStr(48, "aA");

        params = str.params();

        params.should.be.an.Object;
        should(params.include).equal("aA");
        should(params.maxLength).equal(48);
        should(params.minLength).equal(16);

        done();
      });
      it("should be able to set valid params by params()", function(done) {
        str = rStr();
        should.exist(str.params) && str.params.should.be.a.Function;

        var newParams = {
          include: "a#",
          maxLength: 48
        };
        var afterSetParams = str.params(newParams);
        afterSetParams.should.be.an.Object;
        should(afterSetParams.include).equal(newParams.include);
        should(afterSetParams.maxLength).equal(newParams.maxLength);
        should(afterSetParams.minLength).equal(16);

        done();
      });
      it("should generate a new object each time calling rStr()", function(done) {
        str  = rStr("aA");
        str1 = rStr(12, 64, "#!");

        should(str.include).not.equal(str1.include);
        should(str.maxLength).not.equal(str1.maxLength);
        should(str.minLength).not.equal(str1.minLength);

        done();
      });
    });

    describe("Advance tests", function() {
      var str, rMaxLength, rMinLength, rInclude;
      before(function() {
        rMaxLength = Math.floor(Math.random() * 64) + 1;
        rMinLength = rMaxLength - 5;
        if (rMaxLength < rMinLength) {
          var tmp = rMaxLength;
          rMaxLength = rMinLength;
          rMinLength = tmp;
        }

        rInclude = "";
        rInclude += Math.random() > 0.5 ? "a" : "";
        rInclude += Math.random() > 0.5 ? "A" : "";
        rInclude += Math.random() > 0.5 ? "#" : "";
        rInclude += Math.random() > 0.5 ? "!" : "";

        str = rStr(rMinLength, rMaxLength, rInclude);
      });
      it("should expose function generate()", function(done) {
        should.exist(str.generate) && str.generate.should.be.a.Function;

        done();
      });
      it("should generate string with given params, in three different ways", function(done) {
        var genStart = false
        ,   genEnd   = false;

        for (var i = 0, result; i < 333; i++) {
          result = str.generate();
          result.should.be.a.String;
          should(result.length).not.greaterThan(rMaxLength).and.not.lessThan(rMinLength);

          utils.isValidString(result, rInclude).should.be.true;

          if (result.length === rMinLength) {
            genStart = true;
          } else if (result.length === rMaxLength) {
            genEnd = true;
          }
        }

        var ret = str.generate(333);
        should(ret).be.an.Array && should(ret.length).equal(333);
        for (var i = 0; i < ret.length; i ++) {
          should(ret[i]).be.a.String;
          should(ret[i].length).not.greaterThan(rMaxLength).and.not.lessThan(rMinLength);

          utils.isValidString(ret[i], rInclude).should.be.true;

          if (ret[i].length === rMinLength) {
            genStart = true;
          } else if (ret[i].length === rMaxLength) {
            genEnd = true;
          }
        }

        str.generate(333, function(err, data) {
          should(data).be.an.Array && should(data.length).equal(333);
          for (var i = 0; i < data.length; i ++) {
            should(data[i]).be.a.String;
            should(data[i].length).not.greaterThan(rMaxLength).and.not.lessThan(rMinLength);

            utils.isValidString(data[i], rInclude).should.be.true;

            if (data[i].length === rMinLength) {
              genStart = true;
            } else if (data[i].length === rMaxLength) {
              genEnd = true;
            }
          }

          if (genStart && genEnd) {
            done();
          }
        });

      });
    });
  });
}();
