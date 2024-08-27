const { DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

const user = sequelize.define('user', {
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        primaryKey : true,
        unique : true,
        validate: {
            isEmail : true
        }
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    }
}, {
    timestamps : true,
    tableName : 'Users'
})

module.exports = user