const express = require('express');
const fs = require('fs');
const app = express();

// setting up port
const PORT = process.env.PORT || 3030;

// setting up the middle ware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Setting up the notes variable with the db.json file
let notes = fs.readFileSync(__dirname + '/db/db.json', 'utf-8', (err) => {
    if(err) {
        return;
    }
})
