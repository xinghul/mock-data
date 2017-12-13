+ function() {
  "use strict";

  var should = require("should")
  ,   moment = require("moment");

  var rDate = require("../../").date;

  describe("Test date", function() {
    var date, date1;
    describe("Basic tests", function() {
      it("should exist and is a function", function(done) {
        should.exist(rDate) && rDate.should.be.a.Function;

        done();
      });
      it("should be able to set params by construct and get params directly", function(done) {
        date = rDate();
        (date.start).should.equal(1980);
        (date.end).should.equal(2015);
        should(date.format).be.null;
        (date.isUTC).should.equal(false);

        date = rDate(true);
        (date.start).should.equal(1980);
        (date.end).should.equal(2015);
        should(date.format).be.null;
        (date.isUTC).should.equal(true);

        date = rDate(2000, 2010);
        (date.start).should.equal(2000);
        (date.end).should.equal(2010);
        should(date.format).be.null;
        (date.isUTC).should.equal(false);

        date = rDate(1889, 2030, "YYYY");
        (date.start).should.equal(1889);
        (date.end).should.equal(2030);
        (date.format).should.equal("YYYY");
        (date.isUTC).should.equal(false);

        date = rDate(1880, 2032, "YYYY-MM", true);
        (date.start).should.equal(1880);
        (date.end).should.equal(2032);
        (date.format).should.equal("YYYY-MM");
        (date.isUTC).should.equal(true);

        date = rDate({start: 1879, end: 2013});
        (date.start).should.equal(1879);
        (date.end).should.equal(2013);
        should.not.exist(date.format);
        (date.isUTC).should.equal(false);

        date = rDate({start: 1880, end: 2032, format: "YYYY-DD", isUTC: true});
        (date.start).should.equal(1880);
        (date.end).should.equal(2032);
        (date.format).should.equal("YYYY-DD");
        (date.isUTC).should.equal(true);

        done();
      });
      it("should be able to get correct params by params()", function(done) {
        date = rDate();
        should.exist(date.params) && date.params.should.be.a.Function;
        var params = date.params();

        params.should.be.an.Object;
        should(params.start).equal(1980);
        should(params.end).equal(2015);
        should(params.format).be.null;
        should(params.isUTC).equal(false);

        date = rDate(2010, 2013, "YYYY/MM");
        params = date.params();

        params.should.be.an.Object;
        should(params.start).equal(2010);
        should(params.end).equal(2013);
        should(params.format).equal("YYYY/MM");
        should(params.isUTC).equal(false);

        done();
      });
      it("should be able to set valid params by params()", function(done) {
        date = rDate();
        should.exist(date.params) && date.params.should.be.a.Function;

        var newParams = {
          start : 1989,
          end   : 2012,
          format: "MMMM Do YYYY, h:mm:ss a",
          isUTC : true
        };

        var afterSetParams = date.params(newParams);

        afterSetParams.should.be.an.Object;
        should(afterSetParams.start).equal(newParams.start);
        should(afterSetParams.end).equal(newParams.end);
        should(afterSetParams.isUTC).equal(newParams.isUTC);
        should(afterSetParams.format).equal(newParams.format);

        done();
      });
      it("should generate a new object each time calling rDate()", function(done) {
        date  = rDate(true);
        date1 = rDate(1920, 2008, "YYYY");

        should(date.start).not.equal(date1.start);
        should(date.end).not.equal(date1.end);
        should(date.isUTC).not.equal(date1.isUTC);
        should(date.format).not.equal(date1.format);

        done();
      });
    });

    describe("Advance tests", function() {
      var rStart, rEnd;
      before(function() {
        rStart = Math.floor(Math.random() * 2000) + 1;
        rEnd   = rStart + 3;

        date = rDate(rStart, rEnd, "YYYY");
      });
      it("should expose function generate()", function(done) {
        should.exist(date.generate) && date.generate.should.be.a.Function;

        done();
      });
      it("should generate string with given params, in three different ways", function(done) {
        var genStart = false
        ,   genEnd   = false;

        for (var i = 0, year = 0, result; i < 33; i ++) {
          result = date.generate();
          result.should.be.a.String;
          should(result.length).equal(4);

          year = parseInt(result);
          should(year).not.be.greaterThan(rEnd).and.not.be.lessThan(rStart);

          if (year === rStart) {
            genStart = true;
          } else if (year === rEnd) {
            genEnd = true;
          }
        }

        var ret = date.generate(33);
        should(ret).be.an.Array && should(ret.length).equal(33);
        for (var i = 0, year = 0; i < ret.length; i ++) {
          should(ret[i]).be.a.String;
          should(ret[i].length).equal(4);

          year = parseInt(ret[i]);
          should(year).not.be.greaterThan(rEnd).and.not.be.lessThan(rStart);

          if (year === rStart) {
            genStart = true;
          } else if (year === rEnd) {
            genEnd = true;
          }
        }

        date.generate(33, function(err, data) {
          should(data).be.an.Array && should(data.length).equal(33);
          for (var i = 0, year = 0; i < data.length; i ++) {
            should(data[i]).be.a.String;
            should(data[i].length).equal(4);

            year = parseInt(data[i]);
            should(year).not.be.greaterThan(rEnd).and.not.be.lessThan(rStart);

            if (year === rStart) {
              genStart = true;
            } else if (year === rEnd) {
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
