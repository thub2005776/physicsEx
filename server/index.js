require('dotenv').config({ path: "../.env" });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const UserModel = require('./models/Users');
const ExModel = require('./models/Execises');
const ThematicsModel = require('./models/Thematics');
const FilesModel = require('./models/Files');
const ComModel = require('./models/Comments');
const { log } = require('console');




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



app.post('/edit/user', upload.single('file'), (req, res) => {
    const old = req.body.old;
    if (!old) {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.json({ Error: "Error for hassing password " });
            const uid = req.body.uid;
            const values = {
                "name": req.body.name,
                "email": req.body.email,
                "password": hash,
                "img": req.file ? req.file.filename : req.body.img,
                "permission": req.body.permission
            }

            UserModel.findOneAndUpdate({ uid: uid }, values)
                .then(user => res.json(user))
                .catch(err => err.json(err))

        });
    } else {
        const uid = req.body.uid;
        const values = {
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
            "img": req.file ? req.file.filename : req.body.img,
            "permission": req.body.permission
        }

        UserModel.findOneAndUpdate({ uid: uid }, values)
            .then(user => res.json(user))
            .catch(err => err.json(err))
    }

})

//post to del user
app.post("/del/user", (req, res) => {
    const { uid } = req.body;

    UserModel.findOneAndDelete({ uid: uid })
        .then(result => res.json(result))
        .catch(error => res.json(error));
});

app.use(cookieParser());

//post to register user
const salt = parseInt(process.env.SALT);
app.post('/users/add', upload.single('file'), (req, res) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hassing password " });
        const values = {
            "name": req.body.name,
            "email": req.body.email,
            "password": hash,
            "permission": req.body.permission,
            "img": req.file ? req.file.filename : req.body.img,
            "uid": req.body.permission + Date.now()
        }



        UserModel.create(values)
            .then(user => res.json(user))
            .catch(err => err.json(err))

    });

});


// post User login
app.post('/login', (req, res) => {
    const { email, password, permission } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const name = user.email;
                        const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: "1d" });
                        res.cookie('token', token);
                        res.json(user)
                    } else {
                        res.json("Mật khẩu không đúng")
                    }
                })

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
    UserModel.findOne({ uid: uid })
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
        "content": req.body.content,
        "like": 0,
        "dislike": 0
    }
    // console.log(req.body);

    ExModel.create(values)
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

//post edit/ex
app.post('/edit/ex', (req, res) => {
    const no = req.body.id;
    const values = {
        "subThematic": req.body.subThematic,
        "no": req.body.no,
        "question": req.body.question,
        "answer": req.body.answer,
        "content": req.body.content
    }

    ExModel.findOneAndUpdate({ no: no }, values)
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.post('/ex/like', (req, res) => {
    const { exercise, status } = req.body;
    const values = {
        "like": exercise.like,
        "dislike": exercise.dislike
    }
    if (status !== ' ') {
        if (status === 'like' || status === 'likeSubDislike') {
            values.like += 1;
        } else if (status === 'dislike' || status === 'dislikeSublike') {
            values.dislike += 1;
        }
    }


    // console.log(values);
    const no = exercise.no;
    // console.log(req.body);
    ExModel.findOneAndUpdate({ no: no }, values)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

// Get Thematics 
app.get('/thematics', (req, res) => {
    ThematicsModel
        .find()
        .then(them => res.json(them))
        .catch(err => res.json(err))
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
        .catch(err => res.json(err))
})

app.post('/edit/them', upload.single('file'), (req, res) => {
    // console.log(req.file);
    const code = req.body.id;
    // console.log(req.body.id);
    const values = {
        "code": req.body.code,
        "thematic": req.body.thematic,
        "img": req.file ? req.file.filename : req.body.img
    }
    // console.log(values);
    ThematicsModel.findOneAndUpdate({ code: code }, values)
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

//post to del thematic
app.post("/del/them", (req, res) => {
    const { code } = req.body;

    ThematicsModel.findOneAndDelete({ code: code })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

// Get Files
app.get('/docs', (req, res) => {
    FilesModel
        .find()
        .then(files => res.json(files))
        .catch(err => res.json(err))
});

//post to add file

app.post('/fileAdd', upload.single('file'), (req, res) => {
    // console.log(req.file);
    const values = {
        "name": req.file.filename,
        "grade": req.body.grade,
        "fid": req.file.filename + "_" + Date.now()
    }

    FilesModel.create(values)
        .then(user => res.json(user))
        .catch(err => err.json(err))
});

//post to add file

app.post('/edit/file', upload.single('file'), (req, res) => {
    // console.log(req.body);
    const name = req.body.name;
    const values = {
        "name": req.file ? req.file.filename : req.body.name,
        "grade": req.body.grade,
    }

    FilesModel.findOneAndUpdate({ name: name }, values)
        .then(user => res.json(user))
        .catch(err => err.json(err))
});

//post to del doc
app.post("/del/file", (req, res) => {
    const { name } = req.body;

    FilesModel.findOneAndDelete({ name: name })
        .then(result => res.json(result))
        .catch(error => res.json(error));
});

// get Comments
app.get("/comments", (req, res) => {
    ComModel.find()
        .then(result => res.json(result))
        .catch(error => res.json(error));
});
// add Comments
app.post("/add/comment", (req, res) => {
    const values = {
        "uid": req.body.uid,
        "eid": req.body.eid,
        "content": req.body.content,
        "time": Date()
    }

    ComModel.create(values)
        .then(result => res.json(result))
        .catch(error => res.json(error));
});


app.listen(3001, () => {
    console.log("Server is running");
});
