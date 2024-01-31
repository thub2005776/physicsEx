const LoginService = require('../services/login.service');
const ApiError = require('../api-error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
    try {
        const loginService = new LoginService();
        const user = await loginService.login(req.body.email);

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    const email = user.email;
                    const token = jwt.sign({ email }, "jwt-secret-key", { expiresIn: "1d" });
                    if(user.permission === 'user') {
                        return [res.cookie('token', token), res.json(user)];
                    } else 
                        return [res.cookie('Adtoken', token), res.json(user)];
                    
                } else {
                    return res.json("Mật khẩu không đúng");
                }
            })

        } else {
            return res.json("Tài khoản không tồn tại");
        }
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.Ulogout = (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
}

exports.Adlogout = (req, res) => {
    res.clearCookie('Adtoken');
    return res.json({ Status: "Success" });
}

exports.UVerifyUSer = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new ApiError(400, "You have not login"));
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return next(new ApiError(400, "Token is not incorecting"));
            } else {
                return res.json({ Status: "Success", email: decoded.email });
            }
        })
    }
}

exports.AdVerifyUSer = (req, res, next) => {
    const token = req.cookies.Adtoken;
    if (!token) {
        return next(new ApiError(400, "You have not login"));
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return next(new ApiError(400, "Token is not incorecting"));
            } else {
                return res.json({ Status: "Success", email: decoded.email });
            }
        })
    }
}