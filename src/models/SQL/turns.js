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
        allowNull: false
    },
    entrance_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    exit_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        select:false,
        defaultValue: true
    }
});

module.exports = {
    Turns
};