+ function() {
  "use strict";

  var should = require("should");

  var rBoolean = require("../../").boolean;

  describe("Test boolean", function() {
    var bool, bool1;
    describe("Basic tests", function() {
      it("should exist and is a function", function(done) {
        should.exist(rBoolean) && rBoolean.should.be.a.Function;

        done();
      });
      it("should be able to set params by construct and get params directly", function(done) {
        bool = rBoolean();
        (bool.trueOdds).should.equal(0.5);

        bool = rBoolean(0.4);
        (bool.trueOdds).should.equal(0.4);

        bool = rBoolean({trueOdds: 0.7});
        (bool.trueOdds).should.equal(0.7);

        done();
      });
      it("should be able to get correct params by params()", function(done) {
        bool = rBoolean();
        should.exist(bool.params) && bool.params.should.be.a.Function;

        var params = bool.params();
        params.should.be.an.Object;
        should(params.trueOdds).equal(0.5);

        bool = rBoolean(0.6);

        var params = bool.params();
        params.should.be.an.Object;
        should(params.trueOdds).equal(0.6);

        done();
      });
      it("should be able to set params by params()", function(done) {
        bool = rBoolean();
        should.exist(bool.params) && bool.params.should.be.a.Function;

        var newParams = {
          trueOdds: 0.8
        };

        var afterSetParams = bool.params(newParams);

        afterSetParams.should.be.an.Object;
        should(afterSetParams.trueOdds).equal(newParams.trueOdds);

        done();
      });
      it("should generate a new object each time calling rBoolean()", function(done) {
        bool  = rBoolean();
        bool1 = rBoolean(0.3);

        should(bool.trueOdds).not.equal(bool1.trueOdds);

        done();
      });
    });

    describe("Advance tests", function() {
      it("should expose function generate()", function(done) {
        bool = rBoolean();
        should.exist(bool.generate) && bool.generate.should.be.a.Function;

        done();
      });
      it("should generate valid boolean with given params, in three different ways", function(done) {
        bool = rBoolean(0.1);

        var trueCount = 0;

        for (var i = 0, result; i < 333; i ++) {
          result = bool.generate();
          should(result).be.a.Boolean;

          if (result) {
            trueCount ++;
          }
        }

        var ret = bool.generate(333);
        should(ret).be.an.Array && should(ret.length).equal(333);
        for (var i = 0; i < ret.length; i ++) {
          should(ret[i]).be.a.Boolean;

          if (ret[i]) {
            trueCount ++;
          }
        }

        bool.generate(333, function(err, data) {
          should(data).be.an.Array && should(data.length).equal(333);

          for (var i = 0; i < 333; i ++) {
            should(data[i]).be.a.Boolean;

            if (data[i]) {
              trueCount ++;
            }
          }

          if (Math.abs(trueCount - 100) < 50) {
            done();
          }
        });
      });
    });
  });
}();
