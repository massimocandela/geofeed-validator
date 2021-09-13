# geofeed-validator

This utility does a basic validation of geofeed files. Geofeed files are used by Internet providers to provide geolocation information about their IP resources. The geofeed format is described in [RFC8805](https://datatracker.ietf.org/doc/rfc8805/).

> If you want to correct/crowdsource the geolocation of your IP resources, you should link your geofeed file in whois data. You can do that by adding a "remark" in your "inetnum" object, such a remark must be in the format "Geofeed URL". See [RFC9092](https://datatracker.ietf.org/doc/html/rfc9092) for instructions. In this case, instead of using geofeed-validator, you can use [geofeed-finder](https://github.com/massimocandela/geofeed-finder) to test the entire whois+geofeed setup.

### Usage Example

To use the compiled version (linux, mac, windows), see [releases](https://github.com/massimocandela/geofeed-validator/releases/).

Otherwise, you can just download the code and do `npm install` and `npm run serve` to run it.

You can run `geofeed-validator` in the command line, to validate a geofeed file.

* Run the binary `./geofeed-validator-linux-x64 -f YOUR_GEOFEED_FILE`
* Run the source code `npm run serve -- --f YOUR_GEOFEED_FILE`

### Use geofeed-validator in your code

Install it:

```bash
npm install geofeed-validator
```

Import it:

```js
import validator from "geofeed-validator";
```

Use it:

```js
// From String
const errors = validator.fromLine("193.201.40.0/24,IT,IT-RM,Rome,");

//From Array
const errors = validator.fromArray(["193.201.40.0/24", "IT", "IT-RM", "Rome", null]);

// The "errors" array will contain strings describing the errors
// Such as: [ 'Not valid Subdivision Code (iso-3166-2)' ]


// If the array is empty, everything is fine
if (errors.length === 0) {
    console.log("Everything is fine");
}

```

The example above shows how to validate a single geofeed line. If you want to validate an entire geofeed file, you can read the file line by line and validate each line. See example below.

```javascript
const file = "YOUR_GEOFEED_FILE";
const rd = readline.createInterface({
    input: fs.createReadStream(file),
    console: false
});

rd.on('line', function(line) {
    const errors = validator.fromLine(line);

    if (errors.length) {
        console.log(`${line} Error: ${errors.join(", ")}`);
    }
});

```
