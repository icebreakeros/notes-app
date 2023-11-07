const chalk = require('chalk');
const fs = require('fs');
const getNotes = () => {
    return 'Your notes...';
}

// Set the shortcuts.
const log = console.log;
const error = chalk.bold.red;
const success = chalk.bold.green;

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes);
        log(success('New note added!'));
    } else {
        log(error('Sorry..Note title taken!'));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const theNote = notes.find((note) => note.title === title)

    if (typeof theNote !== 'undefined') {
        log(chalk.bold.white.inverse('Title: ' + theNote.title));
        log(chalk.yellow('Note: ') + theNote.body);
    } else {
        log(error('No note found.'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        log(success('Note removed!'));
        saveNotes(notesToKeep);
    } else {
        log(error('No note found.'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    log(chalk.bold.italic.magenta('Your notes:'))
    const listOfNotes = notes.forEach((note) => (log(chalk.yellow(note.title))));
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
