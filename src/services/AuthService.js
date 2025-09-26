const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async ( name, email, password ) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            roleId: 3 // default role: user
        });

        return {
            status: 201,
            data: {
                message: "Usuário criado com sucesso!",
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                },
            },
        };
    } catch (error) {
        return {
            status: 500,
            data: {
                message: "Falha ao criar o usuário!",
                error: error.message,
            },
        };
    }
};