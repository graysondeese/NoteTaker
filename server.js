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
})
// Setting up the notes variable by reading the db.json file
let notes = fs.readFileSync(__dirname + '/db/db.json', 'utf-8', (err) => {
    if(err) {
        return;
    }
})

// Setting notes to an empty arry
if(notes === "") {
    notes = [];
} else {
// Parsing the file that was read 
    notes = JSON.parse(notes);
}

