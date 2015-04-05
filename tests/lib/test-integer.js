+ function() {
  "use strict";

  var should = require("should");

  var rInt = require("../../").integer;

  describe("Test integer", function() {
    var int, int1;
    describe("Basic tests", function() {
      it("should exist and is a function", function(done) {
        should.exist(rInt) && rInt.should.be.a.Function;

        done();
      });
      it("should be able to set params by construct and get params directly", function(done) {
        int = rInt();
        (int.start).should.equal(Number.MIN_SAFE_INTEGER);
        (int.end).should.equal(Number.MAX_SAFE_INTEGER);

        int = rInt(10, 20);
        (int.start).should.equal(10);
        (int.end).should.equal(20);

        done();
      });
      it("should be able to get correct params by params()", function(done) {
        int = rInt();
        should.exist(int.params) && int.params.should.be.a.Function;
        var params = int.params();

        params.should.be.an.Object;
        should(params.start).equal(Number.MIN_SAFE_INTEGER);
        should(params.end).equal(Number.MAX_SAFE_INTEGER);

        int = rInt(2010, 2013);
        params = int.params();

        params.should.be.an.Object;
        should(params.start).equal(2010);
        should(params.end).equal(2013);

        done();
      });
      it("should be able to set valid params by params()", function(done) {
        int = rInt();
        should.exist(int.params) && int.params.should.be.a.Function;

        var newParams = {
          start: 1989,
          end  : 2012
        };

        var afterSetParams = int.params(newParams);

        afterSetParams.should.be.an.Object;
        should(afterSetParams.start).equal(newParams.start);
        should(afterSetParams.end).equal(newParams.end);

        done();
      });
      it("should generate a new object each time calling rInt()", function(done) {
        int  = rInt(-10, 10);
        int1 = rInt(-20, 20);

        should(int.start).not.equal(int1.start);
        should(int.end).not.equal(int1.end);

        done();
      });
    });

    describe("Advance tests", function() {
      var rStart, rEnd;
      before(function() {
        rStart = Math.floor(Math.random() * 2000) + 1;
        rEnd   = rStart + 3;

        int = rInt(rStart, rEnd);
      });
      it("should expose function generate()", function(done) {
        should.exist(int.generate) && int.generate.should.be.a.Function;

        done();
      });
      it("should generate integer with given params, in three different ways", function(done) {
        var genStart = false
        ,   genEnd   = false;

        for (var i = 0, result; i < 33; i ++) {
          result = int.generate();
          result.should.be.a.Number;

          should(result).not.be.greaterThan(rEnd).and.not.be.lessThan(rStart);

          if (result === rStart) {
            genStart = true;
          } else if (result === rEnd) {
            genEnd = true;
          }
        }

        var ret = int.generate(33);
        should(ret).be.an.Array && should(ret.length).equal(33);
        for (var i = 0; i < ret.length; i ++) {
          should(ret[i]).be.a.Number;

          should(ret[i]).not.be.greaterThan(rEnd).and.not.be.lessThan(rStart);

          if (ret[i] === rStart) {
            genStart = true;
          } else if (ret[i] === rEnd) {
            genEnd = true;
          }
        }

        int.generate(33, function(err, data) {
          should(data).be.an.Array && should(data.length).equal(33);
          for (var i = 0; i < data.length; i ++) {
            should(data[i]).be.a.Number;

            should(data[i]).not.be.greaterThan(rEnd).and.not.be.lessThan(rStart);

            if (data[i] === rStart) {
              genStart = true;
            } else if (data[i] === rEnd) {
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
