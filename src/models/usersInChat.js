const { dbConnect,DataTypes } = require('../config/database');

const UsersInChat = dbConnect.define('usersInChat', {
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
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
});

module.exports = { UsersInChat };