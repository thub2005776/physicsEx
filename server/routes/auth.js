const router = require("express").Router();
const passport = require('passport');
require('dotenv').config({path:"../.env"});

router.get("/login/success", (req, res) => {
    if(req.user) {
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
            // cookies: req.cookies
        })
    }
})

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect(process.env.REACT_APP_URL);
})

router.get("/google", passport.authenticate("google", {scope: ['profile']}));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.REACT_APP_URL,
    failureRedirect: "login/failed"
}));

module.exports = router;