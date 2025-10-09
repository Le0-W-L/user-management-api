const Log = require("../models/Logs");

/**
 * Cria um novo registo de log no banco de dados.
 * @param {object} user 
 * @param {string} action 
 * @param {string} ipAddress 
 */

exports.createLog = async (user, action, ipAddress) => {
    try {
        const log = new Log({
            userId: user.id,
            userName: user.name,
            userRole: user.role,
            action,
            ipAddress,
        });
        await log.save();
    } 
    catch (error) {
        console.error("Erro ao criar log:", error);
    }
};