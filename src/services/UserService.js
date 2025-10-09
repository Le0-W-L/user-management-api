const User = require("../models/User");

exports.getAllUsers = async () => {
    try {
        const users = await User.findAll({
            attributes: ["id", "name", "email", "roleId"],
        });

        if (!users) {
            return {
                status: 404,
                data: { message: "Nenhum usuário encontrado!" },
            };
        }

        return {
            status: 200,
            data: {
                message: "Usuários encontrados com sucesso!",
                usuarios: users,
            }
        };
    } 
    catch (error) {
        return {
            status: 500,
            data: {
                message: "Erro ao buscar usuários!",
                error: error.message,
            }
        };
    }
};