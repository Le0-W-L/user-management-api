const logService = require("../services/LogService");
const authService = require("../services/AuthService");
const User = require("../models/User");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    //validations
    if (!name) {
        return res.status(422).json({ message: "Nome é obrigatório!" });
    }
    if (!email) {
        return res.status(422).json({ message: "E-mail é obrigatório!" });
    }
    if (!password) {
        return res.status(422).json({ message: "Senha é obrigatória!" });
    }

    //check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        return res
            .status(422)
            .json({ message: "Parece que esse e-mail já foi utilizado!" });
    }

    try {
        const result = await authService.register(name, email, password);
        
        if(result.status === 201) {
            const newUser = result.data.user;
            await logService.createLog(newUser, "CREATE_USER", req.ip);
        }

        res.status(result.status).json(result.data);
    } 
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
    const { email, password} = req.body;
    
    //validations
    if (!email) {
        return res.status(422).json({ message: "E-mail é obrigatório!" });
    }
    if (!password) {
        return res.status(422).json({ message: "Senha é obrigatória!" });
    }

    try {
        const result = await authService.login(email, password);

        if(result.status === 200) {
            const user = result.data.user;
            await logService.createLog(user, "LOGIN", req.ip);
        }

        res.status(result.status).json(result.data);
    } 
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await authService.getProfile(userId);
        res.status(result.status).json(result.data);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}