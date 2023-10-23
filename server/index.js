require('dotenv').config({ path: "../.env" });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
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
const FilesModel = require('./models/Files');




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
    .catch((err) => {
        console.log(err);
    });


app.use(express.static("../src/assets"));

//post exist
// app.post('/exist', (req, res) => {
//     const email = req.body;
//     UserModel.findOne({ email: email })
//         .then(user => {
//             res.json("Email đã tồn tại");
//         })
//         .catch(err => {
//             res.json({ Err: err, Status: "not found" })
//         })
// });

// UpLoad file 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../src/assets')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.substring(0, file.originalname.indexOf('.'));
        cb(null, fileName + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
});

app.post('/themAdd', upload.single('file'), (req, res) => {
    // console.log(req.file);
    const values = {
        "code": req.body.code,
        "thematic": req.body.thematic,
        "img": req.file.filename
    }
    ThematicsModel.create(values)
        .then(user => res.json(user))
        .catch(err => err.json(err))
})

app.post('/edit/user', upload.single('file'), (req, res) => {
    const id = req.body.id;
    const values = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "img": req.file.filename
    }
    // console.log(values);
    UserModel.findOneAndUpdate({id : id}, values)
        .then(user => res.json(user))
        .catch(err => err.json(err))
})

app.use(cookieParser());

//post to register user
const salt = parseInt(process.env.SALT);
app.post('/users/add', upload.single('file'), (req, res) => {
    // bcrypt.hash(req.body.password, salt, (err, hash) => {
    //     if(err) return res.json({Error: "Error for hassing password "});


    // });
    console.log(req.file);
    const values = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "permission": req.body.permission,
        "img": req.file.filename
    }



    UserModel.create(values)
        .then(user => res.json(user))
        .catch(err => err.json(err))
});

//post to add new user
app.post('/users', (req, res) => {
    // bcrypt.hash(req.body.password, salt, (err, hash) => {
    //     if(err) return res.json({Error: "Error for hassing password "});


    // });
    
    const values = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "permission": req.body.permission,
        "img": req.body.img,
        "id": req.body.permission + Date.now()
    }



    UserModel.create(values)
        .then(user => res.json(user))
        .catch(err => err.json(err))
});

// post User login
app.post('/login', (req, res) => {
    const { email, password, permission } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    const name = user.email;
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: "1d" });
                    res.cookie('token', token);
                    res.json(user)
                } else {
                    res.json("Mật khẩu không đúng")
                }
            } else {
                res.json("Tài khoản không tồn tại")
            }
        })
        .catch(err => res.json(err))
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})

//Get verifyUSer
const verifyUSer = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "Bạn chưa đăng nhập" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token không đúng" });
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}
app.get('/token', verifyUSer, (req, res) => {
    return res.json({ Status: "Success", name: req.name });
})

//Post profile
app.post('/profile', (req, res) => {
    UserModel.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

//Post profile/find
app.post('/profile/find', (req, res) => {
    const { uid } = req.body;
    // console.log(uid);
    UserModel.findOne({uid : uid})
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

//post add/ex
app.post('/add/ex', (req, res) => {
    const values = {
        "subThematic": req.body.subThematic,
        "no": req.body.no,
        "question": req.body.question,
        "answer": req.body.answer,
        "content": req.body.content
    }
    // console.log(values);

    ExModel.create(values)
        .then(user => res.json(user))
        .catch(err => err.json(err))
})

// Get Thematics 
app.get('/thematics', (req, res) => {
    ThematicsModel
        .find()
        .then(them => res.json(them))
        .catch(err => res.json(err))
});

// Get Files
app.get('/docs', (req, res) => {
    FilesModel
        .find()
        .then(files => res.json(files))
        .catch(err => res.json(err))
});



app.listen(3001, () => {
    console.log("Server is running");
});
