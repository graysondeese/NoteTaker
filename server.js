const express = require('express');
const fs = require('fs');
const app = express();

// setting up port
const PORT = process.env.PORT || 3030;

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());