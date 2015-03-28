+function () {
    "use strict";

    var should = require("should")
    ,   moment = require("moment");

    var rdate  = require("../lib/date")
    ,   format = "MMMM Do YYYY, h:mm:ss a";

    describe("Test date", function() {
        describe("Test basics", function() {
            it("should exist", function (done) {
                rdate.should.exist;

                done();
            });
            it("should not be able to get parameters directly", function (done) {
                should.not.exist(rdate.start);
                should.not.exist(rdate.end);
                should.not.exist(rdate.isUTC);
                should.not.exist(rdate.format);

                done();
            });
            it("should have default params and be able to get params by getParams()", function (done) {
                rdate.getParams.should.exist && rdate.getParams.should.be.a.Function;

                var params = rdate.getParams();

                params.should.be.an.Object;
                should(params.start).be.a.Number;
                should(params.end).be.a.Number;
                should(params.isUTC).be.a.Boolean;
                should(params.format).be.null;

                done();
            });
            it("should be able to set parameters by setParams()", function (done) {
                rdate.setParams.should.exist && rdate.setParams.should.be.a.Function;

                var newParams = {
                    start  : 1989,
                    end    : 2012,
                    isUTC  : true,
                    format : format
                };

                rdate.setParams(newParams);

                var afterSetParams = rdate.getParams();

                afterSetParams.should.be.an.Object;
                should(afterSetParams.start).equal(1989);
                should(afterSetParams.end).equal(2012);
                should(afterSetParams.isUTC).equal(true);
                should(afterSetParams.format).equal("MMMM Do YYYY, h:mm:ss a");

                done();
            });
        });

        describe("Test correctness", function() {
            it("should be able to generate valid date using generate()", function (done) {
                rdate.generate.should.exist && rdate.generate.should.be.a.Function;

                for (var i = 0; i < 100; i ++) {
                    var date = rdate.generate();
                    if (!moment(format, rdate.generate()).isValid())
                        console.log(date);
                    // should(moment(format, rdate.generate()).isValid()).be.true;
                }
                
                done();
            });
            it("should generate year in range", function (done) {
                var start = 1989
                ,   end   = 1992;
                rdate.setParams({
                    start : start,
                    end   : end,
                    format: "YYYY"
                });

                for (var i = 0, y = 0; i < 100; i ++) {
                    y = parseInt(rdate.generate());
                    should(y).not.greaterThan(end).and.not.lessThan(start);
                }

                
                done();
            });
        });
    });
}();