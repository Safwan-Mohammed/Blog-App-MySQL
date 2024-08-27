const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const sequelize = require('./config/connection.js')
const cors = require('cors')

const app = express()
const PORT = 8000

app.use(cors({
    credentials: true,
    origin : [`http://localhost:4200`]
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use('/', require('./routes/index.js'));

sequelize.sync({ force : false }).catch(() => console.log(`Error Syncing`))

app.listen(PORT, () => {
    console.log(`Server Running At Port 8000`)
})