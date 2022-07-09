const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
const Data = dbConnect.define('data', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = {
    Data
};