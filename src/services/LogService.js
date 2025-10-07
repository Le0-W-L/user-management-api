const Log = require("../models/Logs");

/**
 * Cria um novo registo de log no banco de dados.
 * @param {string} userId 
 * @param {string} action 
 * @param {string} ipAddress 
 */

exports.createLog = async (userId, action, ipAddress) => {
    try {
        const log = new Log({
            userId,
            action,
            ipAddress,
        });
        await log.save();
    } 
    catch (error) {
        console.error("Erro ao criar log:", error);
    }
};