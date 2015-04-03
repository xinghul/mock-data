<pre>
 _______  _______  _______  _               ______   _______ _________ _______
(       )(  ___  )(  ____ \| \    /\       (  __  \ (  ___  )\__   __/(  ___  )
| () () || (   ) || (    \/|  \  / /       | (  \  )| (   ) |   ) (   | (   ) |
| || || || |   | || |      |  (_/ /  _____ | |   ) || (___) |   | |   | (___) |
| |(_)| || |   | || |      |   _ (  (_____)| |   | ||  ___  |   | |   |  ___  |
| |   | || |   | || |      |  ( \ \        | |   ) || (   ) |   | |   | (   ) |
| )   ( || (___) || (____/\|  /  \ \       | (__/  )| )   ( |   | |   | )   ( |
|/     \|(_______)(_______/|_/    \/       (______/ |/     \|   )_(   |/     \|  



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

Default date type is date, default count is 10000.

```javascript
mock.generate({
  type: "integer/date/ipv4/...",
  count: "...",
  params: "options for specific data type"
}[, callback])
```

#### Support date types

For now, it can generate `integer`, `date` and `ipv4`.

#### Options for specific data type


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

**Ipv4**

If you want to generate a specific range of ip addresses, you can pass in format containing '*' :

For example, `"192.168.*.*"` will generate ip addresses in class C.
```javascript
params: {
  format: (default *.*.*.*)
}
```

## Test

```
$ npm test
```
