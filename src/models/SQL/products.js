const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
const Products = dbConnect.define('product', {
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
        allowNull: false
    },
    sectionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = {
    Products
};