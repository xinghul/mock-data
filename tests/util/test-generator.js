+ function() {
  "use strict";

  var moment = require("moment")
  ,   should = require("should");

  var mock = require("../../")
  ,   utils = require("../../util/utils");

  describe("Test generator", function() {
    describe("Basic tests", function() {
      it("should exist and is a function", function(done) {
        should.exist(mock.generate) && mock.generate.is.a.Function;

        done();
      });
      it("should be able to take callback", function(done) {
        mock.generate({
          type: "date",
          count: 10
        }, function(err, data) {
          done();
        });
      });
      it("should be able to stream", function(done) {
        var generator = mock.generate({
          type: "date",
          count: 10
        });

        generator.on("data", function(data) {
          should.exist(data) && data.should.be.a.String;
        });
        generator.on("end", function() {
          done();
        });
      });
    });

    describe("Test generate string", function() {
      var rMaxLength, rMinLength, rInclude;
      before(function() {
        rMaxLength = Math.floor(Math.random() * 64) + 1;
        rMinLength = Math.floor(Math.random() * 64) + 1;
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
      });
      it("should generate correct string by callback", function(done) {
        mock.generate({
          type: "string",
          count: 100,
          params: {
            minLength: rMinLength,
            maxLength: rMaxLength,
            include  : rInclude
          }
        }, function(err, data) {
          should.exist(data) && data.should.be.an.Array;
          data.length.should.equal(100);

          for (var i = 0; i < data.length; i++) {
            utils.isValidString(data[i], rInclude).should.be.true;

            should(data[i].length).not.be.greaterThan(rMaxLength)
                              .and.not.be.lessThan(rMinLength);
          }

          done();
        });
      });
      it("should generate correct string by stream", function(done) {
        var generator = mock.generate({
          type: "string",
          count: 100,
          params: {
            minLength: rMinLength,
            maxLength: rMaxLength,
            include  : rInclude
          }
        });

        generator.on("data", function(data) {
          should.exist(data) && data.should.be.a.String;

          utils.isValidString(data, rInclude).should.be.true;
          should(data.length).not.be.greaterThan(rMaxLength)
                         .and.not.be.lessThan(rMinLength);
        });
        generator.on("end", function() {
          done();
        });
      });
    });

    describe("Test generate date", function() {
      var rYear;
      before(function() {
        rYear = Math.floor(Math.random() * 2000);
      });
      it("should generate correct date by callback", function(done) {
        mock.generate({
          type: "date",
          count: 10,
          params: {
            start: rYear,
            end: rYear,
            format: "YYYY"
          }
        }, function(err, data) {
          should.exist(data) && data.should.be.an.Array;
          data.length.should.equal(10);

          for (var i = 0; i < data.length; i++) {
            parseInt(data[i]).should.equal(rYear);
          }

          done();
        });
      });
      it("should generate correct date by stream", function(done) {
        var generator = mock.generate({
          type: "date",
          count: 10,
          params: {
            start: rYear,
            end: rYear,
            format: "YYYY"
          }
        });

        generator.on("data", function(data) {
          should.exist(data) && data.should.be.a.String;

          parseInt(data).should.equal(rYear);
        });
        generator.on("end", function() {
          done();
        });
      });
    });
    describe("Test generate integer", function() {
      var rStart, rEnd;
      before(function() {
        rStart = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER)) + Number.MIN_SAFE_INTEGER;
        rEnd = rStart + 3;
      });
      it("should generate correct integer by callback", function(done) {
        mock.generate({
          type: "integer",
          count: 100,
          params: {
            start: rStart,
            end: rEnd
          }
        }, function(err, data) {
          should.exist(data) && data.should.be.an.Array;
          data.length.should.equal(100);

          var genStart = false,
            genEnd = false;
          for (var i = 0; i < data.length; i++) {
            should.exist(data[i]) && data[i].should.be.a.Number;
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
      it("should generate correct integer by stream", function(done) {
        var generator = mock.generate({
          type: "integer",
          count: 100,
          params: {
            start: rStart,
            end: rEnd
          }
        });

        var genStart = false,
          genEnd = false;
        generator.on("data", function(data) {
          should.exist(data) && data.should.be.a.Number;
          should(data).not.be.greaterThan(rEnd).and.not.be.lessThan(rStart);

          if (data === rStart) {
            genStart = true;
          } else if (data === rEnd) {
            genEnd = true;
          }
        });
        generator.on("end", function() {
          if (genStart && genEnd) {
            done();
          }
        });
      });
    });

    describe("Test generate ipv4", function() {
      var format, start, end;
      before(function() {
        format = "192.168.*.1";
        start = utils.ipv4ToInt("192.168.0.1");
        end = utils.ipv4ToInt("192.168.255.1");
      });
      it("should generate correct ipv4 by callback", function(done) {
        mock.generate({
          type: "ipv4",
          count: 100,
          params: {
            format: format
          }
        }, function(err, data) {
          should.exist(data) && data.should.be.an.Array;
          data.length.should.equal(100);

          for (var i = 0; i < data.length; i++) {
            utils.isValidIpv4(data[i]).should.be.true;

            should(utils.ipv4ToInt(data[i])).not.be.greaterThan(end).and.not.be.lessThan(start);
          }

          done();
        });
      });
      it("should generate correct ipv4 by stream", function(done) {
        var generator = mock.generate({
          type: "ipv4",
          count: 100,
          params: {
            format: format
          }
        });

        generator.on("data", function(data) {
          should.exist(data) && data.should.be.a.String;
          should(utils.ipv4ToInt(data)).not.be.greaterThan(end).and.not.be.lessThan(start);
        });
        generator.on("end", function() {
          done();
        });
      });
    });

    describe("Test generate boolean", function() {
      var trueOdds;
      before(function() {
        trueOdds = Math.random();
      });
      it("should generate correct boolean by callback", function(done) {
        mock.generate({
          type: "boolean",
          count: 1000,
          params: {
            trueOdds: trueOdds
          }
        }, function(err, data) {
          should.exist(data) && data.should.be.an.Array;
          data.length.should.equal(1000);

          var trueCount = 0;
          for (var i = 0; i < data.length; i++) {
            should(data[i]).be.a.Boolean;

            if (data[i]) {
              trueCount ++;
            }
          }

          if (Math.abs(trueCount - trueOdds * 1000) < 50) {
            done();
          }
        });
      });
      it("should generate correct boolean by stream", function(done) {
        var generator = mock.generate({
          type: "boolean",
          count: 1000,
          params: {
            trueOdds: trueOdds
          }
        });

        var trueCount = 0;
        generator.on("data", function(data) {
          should.exist(data) && data.should.be.a.Boolean;

          if (data) {
            trueCount ++;
          }
        });
        generator.on("end", function() {
          if (Math.abs(trueCount - trueOdds * 1000) < 50) {
            done();
          }
        });
      });
    });

  });
}();
