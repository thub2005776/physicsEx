const { UserModel } = require('../models/models');

class LoginService {
    constructor() {
        this.user = UserModel;
    }

    async login(email) {
        const result = await UserModel.findOne({ email: email })
        return result;
    }

    
}

module.exports = LoginService;