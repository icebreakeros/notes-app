const chalk = require('chalk');
const fs = require('fs');
const getNotes = function() {
    return 'Your notes...';
}

log = console.log;

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title;
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes);
        log('New note added!')
    } else {
        log('Sorry..Note title taken!')
    }
}

const removeNote = function (title) {
    const notes = loadNotes();
    const findTitle = title;
    const foundTitle = notes.find(({ title }) => title === findTitle);
    if (typeof foundTitle !== 'undefined') {
        log(chalk.bold.green.italic('Note removed!'))
        const notesToKeep = notes.filter(function (note) {
            return note.title !== title;
        })
        saveNotes(notesToKeep);
    } else {
        log(chalk.bold.red.italic('No note found.'))
        notesToKeep = notes;
        saveNotes(notesToKeep);
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function() {
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
    removeNote: removeNote
}
