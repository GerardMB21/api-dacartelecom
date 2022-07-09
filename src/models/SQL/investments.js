const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
const Investments = dbConnect.define('investment', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inversion: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
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
    Investments
};
