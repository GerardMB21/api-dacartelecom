const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
const Advisers = dbConnect.define('adviser', {
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
    img_profile: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false
    },
    campaignId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false
    },
    sectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    Advisers
};