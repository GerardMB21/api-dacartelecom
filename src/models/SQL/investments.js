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
    inversion: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate:{
            isNumeric:true
        }
    },
    lead: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate:{
            isNumeric:true
        }
    },
    google: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate:{
            isNumeric:true
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            isDate:true
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
    Investments
};
