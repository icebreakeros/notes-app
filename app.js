const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Set the shortcuts.
const log = console.log;
const error = chalk.bold.red;
const success = chalk.bold.green.italic;

// Create add command.
yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe:'Body content',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
    }
})

// Create remove command.
yargs.command({
    command: 'remove',
    describe: 'Remove the note.',
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
})

// Create list command.
yargs.command({
    command: 'list',
    describe: 'List all notes.',
    handler: function () {
        log('List all notes');
    }
})

// Create read command.
yargs.command({
    command: 'read',
    describe: 'Read the note.',
    handler: function () {
        log('Read the note');
    }
})

yargs.parse();
