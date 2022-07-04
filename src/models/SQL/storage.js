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
        allowNull: false
    },
    dir_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permission: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    userId: {
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
    Storage
};