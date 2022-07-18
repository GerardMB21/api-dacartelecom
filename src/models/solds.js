const { dbConnect,DataTypes } = require('../config/database');

const Solds = dbConnect.define('solds', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    sold: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dayTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    adviserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    campaignId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
});

module.exports = { Solds };