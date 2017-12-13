+ function() {
  "use strict";

  var should = require("should");

  var utils = require("../../util/utils");

  describe("Test utils", function() {
    describe("Test isNumeric()", function() {
      var isNumeric;
      before(function() {
        isNumeric = utils.isNumeric;
      });
      it("should exist and is a function", function(done) {
        should.exist(isNumeric) && isNumeric.should.be.a.Function;

        done();
      });
      it("should be able to check if target is numeric", function(done) {
        isNumeric("123").should.be.true;
        isNumeric("123.123").should.be.true;
        isNumeric("+123").should.be.true;
        isNumeric("-123").should.be.true;
        isNumeric(123).should.be.true;
        isNumeric(-123).should.be.true;
        isNumeric(123.123).should.be.true;

        isNumeric("").should.be.false;
        isNumeric(undefined).should.be.false;
        isNumeric("12!3").should.be.false;
        isNumeric({
          name: "levi"
        }).should.be.false;
        isNumeric([1, 2, 3]).should.be.false;

        done();
      });
    });

    describe("Test isIpv4Format()", function() {
      var isIpv4Format;
      before(function() {
        isIpv4Format = utils.isIpv4Format;
      });
      it("should exist and is a function", function(done) {
        should.exist(isIpv4Format) && isIpv4Format.should.be.a.Function;

        done();
      });
      it("should be able to check if target string is a valid ipv4 format", function(done) {
        isIpv4Format("*.*.*.*").should.be.true;
        isIpv4Format("192.168.*.*").should.be.true;
        isIpv4Format("10.0.0.1").should.be.true;

        isIpv4Format("*.*.*.").should.be.false;
        isIpv4Format("192.168.1").should.be.false;
        isIpv4Format("-192.168.*.*").should.be.false;
        isIpv4Format("192.1*8.*.*").should.be.false;
        isIpv4Format("10.0.0.1.1").should.be.false;
        isIpv4Format(123).should.be.false;
        isIpv4Format({
          name: "levi"
        }).should.be.false;
        isIpv4Format([1, 2, 3]).should.be.false;

        done();
      });
    });

    describe("Test isValidIpv4()", function() {
      var isValidIpv4;
      before(function() {
        isValidIpv4 = utils.isValidIpv4;
      });
      it("should exist and is a function", function(done) {
        should.exist(isValidIpv4) && isValidIpv4.should.be.a.Function;

        done();
      });
      it("should be able to check if target string is a valid ipv4", function(done) {
        isValidIpv4("192.168.0.1").should.be.true;
        isValidIpv4("10.0.0.1").should.be.true;

        isValidIpv4("*.*.*.*").should.be.false;
        isValidIpv4("192.168.*.1").should.be.false;
        isValidIpv4("10.0.0.1.1").should.be.false;
        isValidIpv4("10.0.1").should.be.false;
        isValidIpv4(123).should.be.false;
        isValidIpv4({
          name: "levi"
        }).should.be.false;
        isValidIpv4([1, 2, 3]).should.be.false;

        done();
      });
    });

    describe("Test ipv4ToInt()", function() {
      var ipv4ToInt;
      before(function() {
        ipv4ToInt = utils.ipv4ToInt;
      });
      it("should exist and is a function", function(done) {
        should.exist(ipv4ToInt) && ipv4ToInt.should.be.a.Function;

        done();
      });
      it("should return the correct integer based on given valid ipv4", function(done) {
        ipv4ToInt("127.0.0.1").should.equal(2130706433);
        ipv4ToInt("207.135.66.186").should.equal(3481748154);
        ipv4ToInt("192.168.0.1").should.equal(3232235521);

        done();
      });
    });

    describe("Test intToIpv4()", function() {
      var intToIpv4;
      before(function() {
        intToIpv4 = utils.intToIpv4;
      });
      it("should exist and is a function", function(done) {
        should.exist(intToIpv4) && intToIpv4.should.be.a.Function;

        done();
      });
      it("should return the correct ipv4 based on given valid integer", function(done) {
        intToIpv4(2130706433).should.equal("127.0.0.1");
        intToIpv4(3481748154).should.equal("207.135.66.186");
        intToIpv4(3232235521).should.equal("192.168.0.1");
        intToIpv4("3232235521").should.equal("192.168.0.1");

        done();
      });
    });

    describe("Test isValidString()", function() {
      var isValidString;
      before(function() {
        isValidString = utils.isValidString;
      });
      it("should exist and is a function", function(done) {
        should.exist(isValidString) && isValidString.should.be.a.Function;

        done();
      });
      it("should test if a string is valid based on given options", function(done) {
        isValidString("abcdefghijklmnopqrstuvwxyz", "a").should.be.true;
        isValidString("ABCDEFGHIJKLMNOPQRSTUVWXYZ", "A").should.be.true;
        isValidString("0123456789", "#").should.be.true;
        isValidString("~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\", "!").should.be.true;
        isValidString("123abcABC321", "aA#").should.be.true;
        isValidString("asdasdASFDSF", "aA").should.be.true;
        isValidString("as12312Asad", "aA#!").should.be.true;
        isValidString("as12312Asad$%^&*(sad", "aA#!").should.be.true;
        isValidString("as12312Asad$%^&*(sad", "aA#ddfgj21!").should.be.true;

        isValidString("asd213", "a").should.be.false;
        isValidString("asdASD", "A").should.be.false;
        isValidString("0123456789", "!").should.be.false;
        isValidString("fsgfsg#$%^", "a").should.be.false;
        isValidString("asdasd asdasd", "a").should.be.false;

        done();
      });
    });
  });
}();
