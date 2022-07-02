const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
const Status = dbConnect.define('status', {
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
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha:true
        },
        defaultValue:'active'
    }
});

module.exports = {
    Status
};
