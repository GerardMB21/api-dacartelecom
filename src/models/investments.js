const { dbConnect,DataTypes } = require('../config/database');

const Investments = dbConnect.define('investments', {
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
    investment: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    day: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
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
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
});

module.exports = { Investments };