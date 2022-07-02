const { dbConnect } = require('../../config/database');
const { DataTypes } = require('sequelize');

//Model table
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
        validate:{
            isNumeric:true
        }
    },
    day_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            isDate:true
        }
    },
    adviserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false,
        validate:{
            isNumeric:true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false,
        validate:{
            isNumeric:true
        }
    },
    campaignId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false,
        validate:{
            isNumeric:true
        }
    },
    sectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false,
        validate:{
            isNumeric:true
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        select:false,
        validate:{
            isNumeric:true
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
    Solds
};