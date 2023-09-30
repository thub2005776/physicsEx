require('dotenv').config({path:"../.env"});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const ExModel = require('./models/Execises');
const ThematicsModel = require('./models/Thematics');

const app = express();
app.use(cors());
app.use(express.json());
console.log(process.env.DATABASE_URI);
mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
        console.log("Connected!");
    })
    .catch ((err)  => {
        console.log(err);
    });

// Get User 
app.get('/users', (req, res) => {
    UserModel
        .find()
        .then(users => res.json(users))
        .catch((err) => res.json(err))
});

// Get Exercises 
app.get('/exercises', (req, res) => {
    ExModel
        .find()
        .then(Ex => res.json(Ex))
        .catch(err => res.json(err))
});

// Get Thematics 
app.get('/thematics', (req, res) => {
    ThematicsModel
        .find()
        .then(them => res.json(them))
        .catch(err => res.json(err))
});


app.listen(3001, () => {
    console.log("Server is running!");
});
