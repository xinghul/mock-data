+ function() {
  "use strict";

  var should = require("should")
  ,   moment = require("moment");

  var rDate = require("../../").generic.date;

  var rDate1, rDate2;

  describe("Test date", function() {
    describe("Basic tests", function() {
      before(function() {
        rDate1 = rDate();
      });
      it("should exist and is a function", function(done) {
        should.exist(rDate) && rDate.should.be.a.Function;

        done();
      });
      it("should be able to get internal parameters directly", function(done) {
        should.exist(rDate1.start);
        should.exist(rDate1.end);
        should.exist(rDate1.isUTC);
        should(rDate1.format).be.null;

        done();
      });
      it("should have default params and be able to get params by params()", function(done) {
        should.exist(rDate1.params) && rDate1.params.should.be.a.Function;

        var params = rDate1.params();

        params.should.be.an.Object;
        should(params.start).be.a.Number;
        should(params.end).be.a.Number;
        should(params.isUTC).be.a.Boolean;
        should(params.format).be.null;

        done();
      });
      it("should be able to set params by params()", function(done) {
        should.exist(rDate1.params) && rDate1.params.should.be.a.Function;

        var newParams = {
          start: 1989,
          end: 2012,
          isUTC: true,
          format: "MMMM Do YYYY, h:mm:ss a"
        };

        var afterSetParams = rDate1.params(newParams);

        afterSetParams.should.be.an.Object;
        should(afterSetParams.start).equal(newParams.start);
        should(afterSetParams.end).equal(newParams.end);
        should(afterSetParams.isUTC).equal(newParams.isUTC);
        should(afterSetParams.format).equal(newParams.format);

        done();
      });
      it("should generate a new object each time calling rDate()", function(done) {
        rDate1 = rDate();
        rDate1.params({
          start: 1989,
          end: 2012,
          isUTC: true,
          format: "MMMM Do YYYY, h:mm:ss a"
        });

        rDate2 = rDate();
        rDate2.params({
          start: 1990,
          end: 2002,
          isUTC: false,
          format: null
        });

        should(rDate1.start).not.equal(rDate2.start);
        should(rDate1.end).not.equal(rDate2.end);
        should(rDate1.isUTC).not.equal(rDate2.isUTC);
        should(rDate1.format).not.equal(rDate2.format);

        done();
      });
    });

    describe("Advance tests", function() {
      before(function() {
        rDate1 = rDate();
      });
      it("should be able to generate valid date using generate()", function(done) {
        should.exist(rDate1.generate) && rDate1.generate.should.be.a.Function;

        for (var i = 0; i < 100; i++) {
          should(moment(rDate1.generate()).isValid()).be.true;
        }

        done();
      });
      it("should generate year in range", function(done) {
        var start = 1989,
          end = 1992;
        rDate1.params({
          start: start,
          end: end,
          format: "YYYY"
        });

        var genStart = false,
          genEnd = false;
        for (var i = 0, y = 0; i < 100; i++) {
          y = parseInt(rDate1.generate());

          if (y === start) {
            genStart = true;
          } else if (y === end) {
            genEnd = true;
          }

          should(y).not.greaterThan(end).and.not.lessThan(start);
        }

        if (genStart && genEnd) {
          done();
        }
      });
    });
  });
}();
