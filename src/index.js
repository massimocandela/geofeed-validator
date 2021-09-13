import yargs from 'yargs';
import fs from 'fs';
import readline from 'readline';
import validator from './validator';

const params = yargs
    .usage('Usage: $0 <command> [options]')

    .command('$0', 'Run geofeed validator (default)', function () {
        yargs
            .alias('v', 'version')
            .nargs('v', 0)
            .describe('v', 'Show version number')

            .alias('f', 'output')
            .nargs('f', 1)
            .describe('f', 'Input file')
    })
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright (c) 2020, Massimo Candela')
    .argv;

if (!params.f) {
    throw new Error("The input file must be specified (option -f)");
}
const rd = readline.createInterface({
    input: fs.createReadStream(params.f),
    console: false
});

rd.on('line', function(line) {
    const errors = validator.fromLine(line);

    if (errors.length) {
        console.log(`${line} Error: ${errors.join(", ")}`);
    }
});
