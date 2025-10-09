const UserService = require('../services/UserService');
const LogService = require("../services/LogService");

exports.getAllUsers = async(req, res) => {
    try {
        const result = await UserService.getAllUsers();
        
        if(result.status === 200) {
            await LogService.createLog(req.user, "LIST_USERS", req.ip);
        }

        res.status(result.status).json(result.data);
    }
    catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
}