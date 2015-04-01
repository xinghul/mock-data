+function () {
    "use strict";

    var should = require("should")
    ,   moment = require("moment");

    var rInt  = require("../").generic.integer;

    var rInt1, rInt2;

    describe("Test integer", function() {
        describe("Basic tests", function() {
            before(function() {
                rInt1 = rInt();
            });
            it("should exist and is a function", function (done) {
                rInt.should.exist && rInt.should.be.a.Function;

                done();
            });
            it("should be able to set params by construct and get params directly", function (done) {
                rInt1 = rInt(10, 20);

                (rInt1._start).should.equal(10);
                (rInt1._end).should.equal(20);

                done();
            });
            it("should be able to get params by params()", function (done) {
                rInt1.params.should.exist && rInt1.params.should.be.a.Function;

                var params = rInt1.params();

                params.should.be.an.Object;
                should(params.start).be.a.Number;
                should(params.end).be.a.Number;

                done();
            });
            it("should be able to set params by params()", function (done) {
                rInt1.params.should.exist && rInt1.params.should.be.a.Function;

                var newParams = {
                    start  : 1989,
                    end    : 2012
                };

                var afterSetParams = rInt1.params(newParams);

                afterSetParams.should.be.an.Object;
                should(afterSetParams.start).equal(newParams.start);
                should(afterSetParams.end).equal(newParams.end);

                done();
            });
            it("should generate a new object each time calling rInt()", function (done) {
                rInt1 = rInt(-10, 10);

                rInt2 = rInt(-20, 20);
                
                should(rInt1._start).not.equal(rInt2._start);
                should(rInt1._end).not.equal(rInt2._end);

                done();
            });
        });

        describe("Advance tests", function() {
            before(function() {
                rInt1 = rInt();
            });
            it("should be able to generate valid integer using _generate()", function (done) {
                rInt1._generate.should.exist && rInt1._generate.should.be.a.Function;

                for (var i = 0; i < 100; i ++) {
                    rInt1._generate().should.be.a.Number;
                }
                
                done();
            });
            it("should generate integer in range", function (done) {
                var start = 1989
                ,   end   = 1992;
                rInt1.params({
                    start : start,
                    end   : end
                });

                var genStart = false
                ,   genEnd   = false;
                for (var i = 0, y = 0; i < 100; i ++) {
                    y = rInt1._generate();

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