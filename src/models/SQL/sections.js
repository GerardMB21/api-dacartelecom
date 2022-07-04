const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
const Sections = dbConnect.define('section', {
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
    campaignId: {
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
    Sections
};