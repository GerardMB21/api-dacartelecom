const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
const Turns = dbConnect.define('turn', {
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
    entrance_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    exit_time: {
        type: DataTypes.TIME,
        allowNull: false
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
    Turns
};