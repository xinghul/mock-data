<pre>

_______  _______  _______  _        ______   _______ _________ _______
(       )(  ___  )(  ____ \| \    /\(  __  \ (  ___  )\__   __/(  ___  )
| () () || (   ) || (    \/|  \  / /| (  \  )| (   ) |   ) (   | (   ) |
| || || || |   | || |      |  (_/ / | |   ) || (___) |   | |   | (___) |
| |(_)| || |   | || |      |   _ (  | |   | ||  ___  |   | |   |  ___  |
| |   | || |   | || |      |  ( \ \ | |   ) || (   ) |   | |   | (   ) |
| )   ( || (___) || (____/\|  /  \ \| (__/  )| )   ( |   | |   | )   ( |
|/     \|(_______)(_______/|_/    \/(______/ |/     \|   )_(   |/     \|

                

Generate random data(integer, date, ipv4, etc...)

With options(range, count, format, etc...)

Support callback and stream.

</pre>

## Documentation

I'm still working on this project, a full documentation is coming soon.

## Installation

```
$ sudo npm install --save mock-data
```

## Usage

```javascript
var mock = require("mock-data");
```

Get data models first:
```javascript
var rStr  = mock.string  // random string
,   rInt  = mock.integer // random integer
,   rIpv4 = mock.ipv4    // random ipv4
,   rDate = mock.date    // random date
......
```

Get instances from models:
```javascript
var strGen  = rStr()
,   intGen  = rInt()
,   ipv4Gen = rIpv4()
,   dateGen = rDate()
......
```

You can set parameters upon construct, or set them later using `params()` method:
```javascript
var strGen  = rStr(10, 48, "aA")                   // minLength, maxLength, include
,   intGen  = rInt(-2000, 2000)                    // start, end
,   ipv4Gen = rIpv4("192.168.*.*")                 // format
,   dateGen = rDate(1980, 2015, false, "YYYY-MM")  // start, end, isUTC, format
......

strGen.params(10, 48, "aA");
intGen.params(-2000, 2000);
ipv4Gen.params("192.168.*.*");
dateGen.params(1980, 2015, false, "YYYY-MM");
......

strGen.params({start: 10, end: 48, format: "aA"});
intGen.params({start: -2000, end: 2000});
ipv4Gen.params({format: "192.168.*.*"});
dateGen.params({start: 1980, end: 2015, isUTC: false, format: "YYYY-MM"});
......

```
If you don't do this, it will use default settings.

Now you can generate data, one at a time, return an array or using callback:
```javascript
var ret = dateGen.generate(); // 1989-09

var ret = dateGen.generate(100); // [1989-09, 1992-07, ...]

dateGen.generate(100, function(err, data) {
  // data is an array of date with length 100  
});
```

Alternatively, a preferable way to generate data is using `mock.generate()`.

You can get the data from either callback or stream.

#### Callback example

generate integer in given range:

```javascript
mock.generate(
  {
    type: "integer",
    count: 100,
    params: {start: -2000, end: 2000}
  },
  function (err, data) {
    // data is an Array of integers range from -2000 to 2000
  });
```

generate date in given format:

```javascript
mock.generate(
  {
    type: "date",
    count: 10,
    params: {start: 1980, end: 2015, format: "MMMM Do YYYY, h:mm:ss a"}
  },
  function (err, data) {
    // data is an Array of strings (date) in given format and range
  });
```

......

#### Stream example

generate integer:

```javascript
var generator = mock.generate({
  type: "integer",
  count: 10,
  params: {start: 1980, end: 2015}
});

generator.on("data", function (data) {
    // deal with data
});
generator.on("error", function (err) {
    // deal with error
});
generator.on("end", function() {
    // done
});
```

generate date:

```javascript
var generator = mock.generate({
  type: "date",
  count: 10,
  params: {start: 1980, end: 2015, format: "YYYY-MM-DD HH:mm Z"}
});

generator.on("data", function (data) {
    // deal with data
});
generator.on("error", function (err) {
    // deal with error
});
generator.on("end", function() {
    // done
});
```

......

## API

Default date type is string, default count is 10000.

```javascript
mock.generate({
  type: "string/integer/date/ipv4/...",
  count: "...",
  params: "options for specific data type"
}[, callback])
```

#### Supported data types

For now, it supports `string`, `integer`, `date`, `ipv4` and `boolean`.

**String**

Specify length range and charset to generate string :
```javascript
params: {
  minLength: (default 16),
  maxLength: (default 32),
  include  : (default "aA#!")
}
```
The generated random string will have a length between in [`minLength`, `maxLength`], `include` sets which charset to include:
```javascript
'a': "abcdefghijklmnopqrstuvwxyz" ([a-z])
'A': "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ([A-Z])
'#': "0123456789" ([0-9])
"!": [^a-zA-Z0-9]
```

For example, `include` with value "a#" will generate strings like this:
```javascript
"nob21hcdtv9n93ixqhz8nsuw7grdp4brszr4g8tyka66pjtjlh"
"y1a6xuhhgsopbqnb8wqjtx920zmnbgg7u4kw07u3gullm38t6sg"
"5hy4lm78jdq2zqmo3px11r8aubi3kgs7t2blwdzb6f1yogihac"
"6msnskfdf6eyslnm9empq0g4nelf7p6z4qfpdsjuvsqztbpe58pwg"
"vp8uoru82x9eb5pg7umq1v3d4wqrm9cfzshvxcx02vcrebh42o"
"......"
```

**Integer**

Specify a range to generate integer:
```javascript
params: {
  start: (default Number.MIN_SAFE_INTEGER),
  end: (default Number.MAX_SAFE_INTEGER)
}
```

**Date**

You can generate all the formats you want, some examples:
```javascript
"MMMM/DD/YYYY HH-mm-ss a" // "May/27/1989 11-59-34 am"
"YYYY-MM-DD HH:mm"        // "1989-05-27 11:59"
"MM DD YYYY HH:mm:ss"     // "05 27 1989 11:59:34"
"......"
```

```javascript
params: {
  start: (default 1980),
  end: (default 2015),
  format: (default ISO-8601 format),
  isUTC: (default false)
}
```
If you don't specify the format, it will generate dates like this:
```javascript
"1988-10-05T20:05:15-07:00"
"2014-11-14T15:59:50-08:00"
"1997-03-23T17:52:09-08:00"
"1992-10-29T12:19:32-08:00"
"......"
```

**Ipv4**

To generate a specific range of ip addresses, you need to pass in format containing '*' :

For example, `"192.168.*.*"` will generate ip addresses in class C:
```javascript
"192.168.192.206"
"192.168.161.196"
"192.168.9.135"
"192.168.223.172"
"192.168.31.215"
"......"
```

```javascript
params: {
  format: (default "*.*.*.*")
}
```

**Boolean**

Specify the odds for generating `true`, otherwise it will be 50/50;

```javascript
params: {
  trueOdds: (default 0.5)
}
```

## Test

```
$ npm test
```
