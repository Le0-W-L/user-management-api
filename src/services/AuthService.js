const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const createToken = require("../utils/create-token");

exports.register = async (name, email, password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            roleId: 3, // default role: user
        });

        return {
            status: 201,
            data: {
                message: "Usuário criado com sucesso!",
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                },
            },
        };
    } 
    catch (error) {
        return {
            status: 500,
            data: {
                message: "Falha ao criar o usuário!",
                error: error.message,
            },
        };
    }
};

exports.login = async (email, password) => {
    try {
        const user = await User.findOne({ 
            where: { email },
            include: [{
                model: Role,
                as: "role",
                attributes: ["name"],
            }]
        });
        
        if (!user) {
            return {
                status: 404,
                data: { message: "Usuário não encontrado!" },
            };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return {
                status: 401,
                data: { message: "Senha inválida!" },
            };
        }

        const tokenData = await createToken(user);
        return {
            status: 200,
            data: tokenData,
        };
    } 
    catch (error) {
        return {
            status: 500,
            data: {
                message: "Internal server error",
                error: error.message,
            },
        };
    }
};

exports.getProfile = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            include: [{
                model: Role,
                as: "role",
                attributes: ["name"],
            }]
        });

        if (!user) {
            return {
                status: 404,
                data: { message: "Usuário não encontrado!" },
            };
        }

        return {
            status: 200,
            data: {
                message: "Informações do perfil: ",
                name: user.name,
                email: user.email,
                papel: user.role.name,
            },
        };
    } 
    catch (error) {
        return {
            status: 500,
            data: {
                message: "Internal server error",
                error: error.message,
            }
        }
    }
};