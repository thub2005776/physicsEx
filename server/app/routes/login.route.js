const express = require('express');
const log = require('../controllers/login.controller');

const Router = express.Router();

Router.route('/u/login')
    .post(log.login)

Router.route('/u/token')
    .get(log.UVerifyUSer)

Router.route('/u/logout')
    .get(log.Ulogout)

Router.route('/ad/login')
    .post(log.login)

Router.route('/ad/token')
    .get(log.AdVerifyUSer)

Router.route('/ad/logout')
    .get(log.Adlogout)

module.exports = Router;