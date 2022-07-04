const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
const Campaigns = dbConnect.define('campaign', {
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
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        select:false,
        defaultValue: true
    }
});

module.exports = {
    Campaigns
};