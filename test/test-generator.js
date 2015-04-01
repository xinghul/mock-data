+function () {
    "use strict";

    var moment = require("moment")
    ,   should = require("should")
    ,   mock   = require("../");

    describe("Test generator", function() {
        describe("Basic tests", function() {
            it("should exist and is a function", function (done) {
                mock.generate.should.exist && mock.generate.is.a.Function;

                done();
            });
            it("should be able to take callback", function (done) {
                mock.generate({type: "date", count: 10}, function (err, data) {
                    done();
                });
            });
            it("should be able to stream", function (done) {
                var generator = mock.generate({type: "date", count: 10});

                generator.on("data", function (data) {
                    data.should.exist && data.should.be.a.String;
                });
                generator.on("end", function() {
                    done();
                });
            });
        });
        describe("Advance tests", function() {
            it("should generate correct data", function (done) {
                mock.generate({type: "date", count: 10}, function (err, data) {
                    data.should.exist && data.should.be.an.Array;
                    (data.length).should.equal(10);

                    for (var i = 0; i < data.length; i ++) {
                        should(moment(data[i]).isValid()).be.true;
                    }

                    done();
                });
            });
            it("should be able to set params for specific type", function (done) {
                mock.generate({type: "date", count: 10, params: {start: 1990, end: 1990, format: "YYYY"}}, function (err, data) {
                    data.should.exist && data.should.be.an.Array;
                    data.length.should.equal(10);

                    for (var i = 0; i < data.length; i ++) {
                        data[i].should.equal("1990");
                    }

                    done();
                });
            });
        });
    });
}();