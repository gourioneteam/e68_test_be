const express = require('express')
const app = express()
require('dotenv').config()
const connectdb = require('./config/db')
connectdb()
const authroutes = require('./routes/authroutes')
var cors = require('cors')
const cookieParser = require('cookie-parser')

const allowedOrigin = "https://e68-test-frontend.vercel.app";

// CORS configuration
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome to student management system")
})

console.log("start")
app.use('/api', authroutes)

app.listen(process.env.PORT, () => {
    console.log(`listening at port ${process.env.PORT}`)
})