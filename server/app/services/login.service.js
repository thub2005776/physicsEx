const { UserModel } = require('../models');

class LoginService {
    constructor() {
        this.user = UserModel;
    }

    async login(email) {
        const result = await this.user.findOne({ email: email })
        return result;
    }

}

module.exports = LoginService;