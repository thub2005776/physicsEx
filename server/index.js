const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const ExModel = require('./models/Execises');
const ThematicsModel = require('./models/Thematics');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect('mongodb+srv://thub2005776:74d83eded00a@cluster0.jz9smd9.mongodb.net/')
    .then(() => {
        console.log("Ket noi thanh cong!");
    })
    .catch ((err)  => {
        console.log(err);
    });

// Get User 
app.get('/getUsers', (req, res) => {
    UserModel
        .find()
        .then(users => res.json(users))
        .catch((err) => res.json(err))
});

// Get Exercises 
app.get('/getExercises', (req, res) => {
    ExModel
        .find()
        .then(Ex => res.json(Ex))
        .catch(err => res.json(err))
});

// Get Thematics 
app.get('/getThematics', (req, res) => {
    ThematicsModel
        .find()
        .then(them => res.json(them))
        .catch(err => res.json(err))
});


app.listen(3001, () => {
    console.log("Server dang chay!");
});
