
const { Pool } = require('pg');
const express = require('express')
const app = express()
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()
const port = process.env.PORT

app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(express.json({ limit: '30mb', extended: true }))

app.use(cors())
app.use(compression())
app.use(helmet())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

const { connect } = require('./database');
const categoryRoute = require('./routes/category.js')

/*   Routes   */
app.use('/pattern', categoryRoute);
const start = async () => {
    try {
        connect()
            .then(() => {
                app.listen(port, () => {
                    console.log(`Server is running on port ${port}`);
                });
            })
            .catch(err => console.error('Error connecting to PostgreSQL', err));
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

start()