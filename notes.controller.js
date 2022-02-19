const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString(),
    };

    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(
        chalk.whiteBright(`New note : ${JSON.stringify(note)} was added`)
    );
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgBlue("Here is list of notes:"));
    notes.forEach((note) => console.log(chalk.blue(note.id, note.title)));
}

async function removeNote(id) {
    let notes = await getNotes();
    const removingNote = notes.find((note) => note.id === id);
    notes = notes.filter((note) => note.id !== id);

    await fs.writeFile(notesPath, JSON.stringify(notes));

    console.log(
        chalk.yellowBright(
            `Note with title:"${removingNote.title}" and ID: "${removingNote.id}" was deleted`
        )
    );
}

async function editNote(id, payload) {
    let notes = await getNotes();

    console.log(chalk.yellowBright(`Test! ${id}, newTitle - ${payload}`));
    let indexEditingNote = notes.findIndex((n) => n.id === id);

    console.log(notes[indexEditingNote]);
    notes[indexEditingNote] = {
        ...notes[indexEditingNote],
        title: payload,
    };

    await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
    addNote,
    printNotes,
    removeNote,
    getNotes,
    editNote,
};
