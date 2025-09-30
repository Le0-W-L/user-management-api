const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = async (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId || 3,
    };

    const options = {
        expiresIn: "24h",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    return {
        message: "Autenticação realizada com sucesso!",
        token,
        user: payload,
    };
};

module.exports = createToken;