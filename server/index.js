require('dotenv').config({path:"../.env"});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const UserModel = require('./models/Users');
const ExModel = require('./models/Execises');
const ThematicsModel = require('./models/Thematics');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./passport');
const authRoute = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
        console.log("Database connected");
    })
    .catch ((err)  => {
        console.log(err);
    });

app.use(
    cookieSession({
        name: "session", 
        keys: "[physicsEx]", 
        maxAge:24 * 60 * 100
    }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth",  authRoute);

    

// UpLoad file 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_"  + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// app.post('/users',upload.single('file'), (req, res) => {
//     UserModel.create({image: req.file.filename})
//         .then(result => res.json(result))
//         .catch(err => console.log(err))
// })

app.post('/users',(req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => err.json(err))
})

// Get User 
app.post('/login', (req, res) => {
    const {email, password, permission} = req.body;
    UserModel.findOne({email : email})
        .then(user => {
            if(user) {
                if(user.password === password) {
                    res.json(user)
                } else {
                    res.json("password incorect")
                }
            }  else {
                res.json("account don't exist")
            }
        })
        .catch(err => res.json(err))
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
    console.log("Server is running");
});
