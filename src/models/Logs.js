const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
    {
        userId: {
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