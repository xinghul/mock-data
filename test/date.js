+function () {
    "use strict";

    var should = require("should")
    ,   moment = require("moment");

    var rDate  = require("../lib/date");

    var rDate1
    ,   rDate2;

    describe("Test date", function() {
        describe("Test basics", function() {
            before(function() {
                rDate1 = rDate();
            });
            it("should exist and is a function", function (done) {
                rDate.should.exist && rDate.should.be.a.Function;

                done();
            });
            it("should be able to get internal parameters directly", function (done) {
                should.exist(rDate1._start);
                should.exist(rDate1._end);
                should.exist(rDate1._isUTC);
                should(rDate1._format).be.null;

                done();
            });
            it("should have default params and be able to get params by getParams()", function (done) {
                rDate1.getParams.should.exist && rDate1.getParams.should.be.a.Function;

                var params = rDate1.getParams();

                params.should.be.an.Object;
                should(params.start).be.a.Number;
                should(params.end).be.a.Number;
                should(params.isUTC).be.a.Boolean;
                should(params.format).be.null;

                done();
            });
            it("should be able to set parameters by setParams()", function (done) {
                rDate1.setParams.should.exist && rDate1.setParams.should.be.a.Function;

                var newParams = {
                    start  : 1989,
                    end    : 2012,
                    isUTC  : true,
                    format : "MMMM Do YYYY, h:mm:ss a"
                };

                rDate1.setParams(newParams);

                var afterSetParams = rDate1.getParams();

                afterSetParams.should.be.an.Object;
                should(afterSetParams.start).equal(newParams.start);
                should(afterSetParams.end).equal(newParams.end);
                should(afterSetParams.isUTC).equal(newParams.isUTC);
                should(afterSetParams.format).equal(newParams.format);

                done();
            });
            it("should generate a new object each time calling rDate()", function (done) {
                rDate1 = rDate();
                rDate1.setParams({
                    start  : 1989,
                    end    : 2012,
                    isUTC  : true,
                    format : "MMMM Do YYYY, h:mm:ss a"
                });

                rDate2 = rDate();
                rDate2.setParams({
                    start  : 1990,
                    end    : 2002,
                    isUTC  : false,
                    format : null
                });

                should(rDate1._start).not.equal(rDate2._start);
                should(rDate1._end).not.equal(rDate2._end);
                should(rDate1._isUTC).not.equal(rDate2._isUTC);
                should(rDate1._format).not.equal(rDate2._format);

                done();
            });
        });

        describe("Test correctness", function() {
            before(function() {
                rDate2 = rDate();
            });
            it("should be able to generate valid date using generate()", function (done) {
                rDate2.generate.should.exist && rDate2.generate.should.be.a.Function;

                for (var i = 0; i < 100; i ++) {
                    should(moment(rDate2.generate()).isValid()).be.true;
                }
                
                done();
            });
            it("should generate year in range", function (done) {
                var start = 1989
                ,   end   = 1992;
                rDate2.setParams({
                    start : start,
                    end   : end,
                    format: "YYYY"
                });

                for (var i = 0, y = 0; i < 100; i ++) {
                    y = parseInt(rDate1.generate());
                    should(y).not.greaterThan(end).and.not.lessThan(start);
                }

                done();
            });
        });
    });
}();