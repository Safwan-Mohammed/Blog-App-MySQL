const { DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const User = require('../models/user')

const blog = sequelize.define('blog', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    content : {
        type : DataTypes.TEXT,
        allowNull: false
    },
    email : {
        type : DataTypes.STRING,
        allowNull: false,
        references:{
            model : User,
            key : 'email'
        },
        onDelete : 'cascade',
        onUpdate : 'cascade'
    }
}, {
    tableName: 'blogs',
    timestamps : true
})

blog.belongsTo(User, {foreignKey : 'email'})

module.exports = blog