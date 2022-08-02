const { dbConnect,DataTypes } = require('../config/database');

const Messages = dbConnect.define('messages', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
});

module.exports = { Messages };