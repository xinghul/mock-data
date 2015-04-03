+ function() {
  "use strict";

  var should = require("should");

  var utils = require("../../util/utils")
  ,   rStr  = require("../../").generic.string;

  describe("Test string", function() {
    var str, str1;
    describe("Basic tests", function() {
      before(function() {
        str = rStr();
      });
      it("should exist and is a function", function(done) {
        rStr.should.exist && rStr.should.be.a.Function;

        done();
      });
      it("should be able to set params by construct and get params directly", function(done) {
        str = rStr();
        (str._include).should.equal("aA#!");
        (str._length).should.equal(32);

        str = rStr("aA!", 64);
        (str._include).should.equal("aA!");
        (str._length).should.equal(64);

        str = rStr("a#!");
        (str._include).should.equal("a#!");
        (str._length).should.equal(32);

        str = rStr(36);
        (str._include).should.equal("aA#!");
        (str._length).should.equal(36);

        str = rStr({include: "a#", length: 36});
        (str._include).should.equal("a#");
        (str._length).should.equal(36);

        done();
      });
      it("should be able to get correct params by params()", function(done) {
        str = rStr();

        str.params.should.exist && str.params.should.be.a.Function;
        var params = str.params();

        params.should.be.an.Object;
        should(params.include).equal("aA#!");
        should(params.length).equal(32);

        str = rStr("aA", 48);

        params = str.params();

        params.should.be.an.Object;
        should(params.include).equal("aA");
        should(params.length).equal(48);

        done();
      });
      it("should be able to set valid params by params()", function(done) {
        str = rStr();
        str.params.should.exist && str.params.should.be.a.Function;

        var newParams = {
          include: "a#",
          length: 32
        };
        var afterSetParams = str.params(newParams);
        afterSetParams.should.be.an.Object;
        should(afterSetParams.include).equal(newParams.include);
        should(afterSetParams.length).equal(newParams.length);

        str.params({
          include: "abcd#",
          length: -43
        });
        should(str._include).equal("a#");
        should(str._length).equal(32);

        str.params({
          include: null,
          length: null
        });
        should(str._include).equal("a#");
        should(str._length).equal(32);

        done();
      });
      it("should generate a new object each time calling rStr()", function(done) {
        str = rStr("aA");
        str1 = rStr("#!", 64);

        should(str._include).not.equal(str1._include);
        should(str._length).not.equal(str1._length);

        done();
      });
    });

    describe("Advance tests", function() {
      var str, rLength, rInclude;
      before(function() {
        rLength = Math.floor(Math.random() * 64) + 1;

        rInclude = "";
        rInclude += Math.random() > 0.5 ? "a" : "";
        rInclude += Math.random() > 0.5 ? "A" : "";
        rInclude += Math.random() > 0.5 ? "#" : "";
        rInclude += Math.random() > 0.5 ? "!" : "";

        str = rStr(rInclude, rLength);

      });
      it("should expose function generate()", function(done) {
        str.generate.should.exist && str.generate.should.be.a.Function;

        done();
      });
      it("should generate string with given params", function(done) {
        for (var i = 0, result; i < 100; i++) {
          result = str.generate();
          result.should.be.a.String && result.length.should.equal(rLength);

          utils.isValidString(result, rInclude).should.be.true;
        }

        done();
      });
    });
  });
}();
