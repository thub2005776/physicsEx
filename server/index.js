require('dotenv').config({path:"../.env"});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const cookieSession = require('cookie-session');
// const passport = require('passport');
// const passportSetup = require('./passport');
// const authRoute = require('./routes/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const UserModel = require('./models/Users');
const ExModel = require('./models/Execises');
const ThematicsModel = require('./models/Thematics');




const app = express();
app.use(cors({
    origin: [process.env.REACT_APP_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
        console.log("Database connected");
    })
    .catch ((err)  => {
        console.log(err);
    });

// app.use(
//     cookieSession({
//         name: "token", 
//         keys: "[physicsEx]", 
//         maxAge:24 * 60 * 60 * 100
//     }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/auth",  authRoute);

app.use(express.static("../src/assets")) ;

// UpLoad file 
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_"  + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage
// })

// app.post('/users',upload.single('file'), (req, res) => {
//     UserModel.create({image: req.file.filename})
//         .then(result => res.json(result))
//         .catch(err => console.log(err))
// })

app.use(cookieParser());

const salt = parseInt(process.env.SALT);
app.post('/users',(req, res) => {
    // bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    //     if(err) return res.json({Error: "Error for hassing password "});

        
    // })
    const values = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "permission" : req.body.permission,
        "img": req.body.img
        }

        UserModel.create(values)
            .then(user => res.json(user))
            .catch(err => err.json(err))
})

// Get User 
app.post('/login', (req, res) => {
    const { email, password, permission} = req.body;
    UserModel.findOne({email : email})
        .then(user => {
            if(user) {
                if(user.password === password) {
                    const name = user.email;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: "1d"});
                    res.cookie('token',token);
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

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

//Get verifyUSer
const verifyUSer = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({ Error: "Bạn chưa đăng nhập"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({ Error: "Token không đúng"});
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}
app.get('/token', verifyUSer, (req, res) => {
    return res.json({ Status: "Success", name: req.name});
})

//Post profile
app.post('/profile',(req, res) => {
    UserModel.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

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
