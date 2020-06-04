// Requiring express and fs
const express = require('express');
const fs = require('fs');
const app = express();

// Setting up port
const PORT = process.env.PORT || 3030;

// Setting up the middle ware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Setting the home page to the path /
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Setting the notes page to  path /notes
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

// Setting up the notes variable by reading the db.json file
let notes = fs.readFileSync(__dirname + '/db/db.json', 'utf-8', (err) => {
    if(err) {
        return;
    }
});

// Setting notes to an empty arry
if(notes === "") {
    notes = [];
} else {
// Parsing the file that was read 
    notes = JSON.parse(notes);
};

// Returning notes array with json data to path api/notes
app.get("/api/notes", (req, res) => {
    return res.json(notes);
});

// Post for a new note
app.post("/api/notes", (req, res) => {
    // Setting the note to a variable
    let addNote = req.body;
    // Adding an id to the length of the array that goes up by 1 each time and pushing the note
    addNote.id = notes.length + 1;
    notes.push(addNote);
    // Writing the new file to the db.json file
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(notes, null, 2), (err) => {
        if(err) throw err;
    })
    res.end();
});

// Deleting the note
app.delete("/api/notes/:id", (req, res) => {
    // Setting the counter variable
    let counter = req.params.id;
    // Removing the note by splicing one element 
    notes.splice(counter - 1, 1);
    // For loop to set new id's
    for(var i = 0; i < notes.length; i++) {
        notes[i].counter = i + 1;
    }
    // Writing new file with to the db.json
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(notes, null, 2), (err) => {
        if(err) throw err;
    })
    res.end();
});
// Starting the server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})