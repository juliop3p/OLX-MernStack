const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

// DOTENV
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('Database connected successfully!'))

// APPS USE
app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use('/api', require('./routes'))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))