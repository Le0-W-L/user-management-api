const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if(!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Acesso negado. Você não tem permissão!" });
        }

        next();
    }
}

module.exports = authorize;