const sequelize = require("../config/sequelize");
const { DataTypes, Model } = require("sequelize");

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.ENUM("admin", "manager", "user"),
            defaultValue: "user",
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Role",
        tableName: "role",
        timestamps: false,
    }
);

module.exports = Role;