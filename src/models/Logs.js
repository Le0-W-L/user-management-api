const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
         userName: {
            type: String,
            required: true,
        },
        userRole: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            enum: [
                "LOGIN",
                "LOGOUT",
                "CREATE_USER",
                "DELETE_USER",
                "UPDATE_USER",
                "LIST_USERS",
                "LIST_ROLES",
                "CREATE_ROLE",
                "LIST_LOGS",
            ],
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        ipAddress: {
            type: String,
            required: true,
        },
    },
    {
        collection: "logs",
    }
);

module.exports = mongoose.model("Log", logSchema);