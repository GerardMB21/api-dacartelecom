const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
const Roles = dbConnect.define('roles', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha:true
        }
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false,
        validate:{
            isNumeric:true
        },
        defaultValue:1
    }
});

module.exports = {
    Roles
};