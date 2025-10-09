const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = async (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role ? user.role.name : "user", // Role name for authorization
        roleId: user.roleId || 3, // Keep roleId for compatibility
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