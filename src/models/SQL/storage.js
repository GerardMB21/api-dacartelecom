const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
const Storage = dbConnect.define('storage', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isUrl:true
        }
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha:true,
            isAlphanumeric:true
        }
    },
    dir_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha:true,
            isAlphanumeric:true
        }
    },
    permission: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            isNumeric:true
        }
    },
    userId: {
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
    Storage
};