const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
const Users = dbConnect.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false
    },
    campaignId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        select:false
    },
    sectionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        select:false
    },
    turnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        select:false,
        defaultValue: true
    }
});

module.exports = {
    Users
};