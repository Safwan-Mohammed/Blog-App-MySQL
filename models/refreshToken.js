const { DataTypes } = require('sequelize')

const sequelize = require('../config/connection')
const User = require('./user')

const refreshToken = sequelize.define('refreshToken', {
    token : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        references : {
            key : 'email',
            model : User
        },
        onDelete : 'cascade',
        onUpdate : 'cascade'
    },
    expiryDate : {
        type : DataTypes.DATE,
        allowNull : false
    }
}, {
    tableName : 'RefreshTokens',
    timestamps : true
})

refreshToken.belongsTo(User, {foreignKey : 'email'})

module.exports = refreshToken