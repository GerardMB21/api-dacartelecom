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
        unique: true,
        validate:{
            isEmail:true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha:true
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha:true
        }
    },
    img_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            isNumeric:true
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false,
        validate:{
            isNumeric:true
        }
    },
    campaignId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        select:false,
        validate:{
            isNumeric:true
        }
    },
    sectionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        select:false,
        validate:{
            isNumeric:true
        }
    },
    turnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false,
        validate:{
            isNumeric:true
        }
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false,
        validate:{
            isNumeric:true
        },
        defaultValue: 1
    }
});

module.exports = {
    Users
};