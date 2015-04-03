+ function() {
  "use strict";

  var should = require("should");

  var rInt = require("../../").generic.integer;

  var rInt1, rInt2;

  describe("Test integer", function() {
    describe("Basic tests", function() {
      before(function() {
        rInt1 = rInt();
      });
      it("should exist and is a function", function(done) {
        rInt.should.exist && rInt.should.be.a.Function;

        done();
      });
      it("should be able to set params by construct and get params directly", function(done) {
        rInt1 = rInt(10, 20);

        (rInt1.start).should.equal(10);
        (rInt1.end).should.equal(20);

        done();
      });
      it("should be able to get params by params()", function(done) {
        rInt1.params.should.exist && rInt1.params.should.be.a.Function;

        var params = rInt1.params();

        params.should.be.an.Object;
        should(params.start).be.a.Number;
        should(params.end).be.a.Number;

        done();
      });
      it("should be able to set params by params()", function(done) {
        rInt1.params.should.exist && rInt1.params.should.be.a.Function;

        var newParams = {
          start: 1989,
          end: 2012
        };

        var afterSetParams = rInt1.params(newParams);

        afterSetParams.should.be.an.Object;
        should(afterSetParams.start).equal(newParams.start);
        should(afterSetParams.end).equal(newParams.end);

        done();
      });
      it("should generate a new object each time calling rInt()", function(done) {
        rInt1 = rInt(-10, 10);

        rInt2 = rInt(-20, 20);

        should(rInt1.start).not.equal(rInt2.start);
        should(rInt1.end).not.equal(rInt2.end);

        done();
      });
    });

    describe("Advance tests", function() {
      var rStart, rEnd;
      before(function() {
        rInt1 = rInt();
        rStart = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER)) + Number.MIN_SAFE_INTEGER;
        rEnd = rStart + 3;
      });
      it("should be able to generate valid integer using generate()", function(done) {
        rInt1.generate.should.exist && rInt1.generate.should.be.a.Function;

        for (var i = 0; i < 100; i++) {
          rInt1.generate().should.be.a.Number;
        }

        done();
      });
      it("should generate integer in range", function(done) {
        rInt1.params({
          start: rStart,
          end: rEnd
        });

        var genStart = false,
          genEnd = false;
        for (var i = 0, y = 0; i < 100; i++) {
          y = rInt1.generate();

          should(y).not.be.greaterThan(rEnd).and.not.be.lessThan(rStart);

          if (y === rStart) {
            genStart = true;
          } else if (y === rEnd) {
            genEnd = true;
          }
        }

        if (genStart && genEnd) {
          done();
        }
      });
    });
  });
}();
