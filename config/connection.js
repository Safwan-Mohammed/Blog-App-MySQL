const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('blog', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: true
})

sequelize.authenticate().then(() => {
    console.log("Connectedt to Database")
}).catch((err) => {
    console.log(`Error Connecting to Database ${err}`)
})

module.exports = sequelize