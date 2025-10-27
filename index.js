const express=require('express')
const app=express()
require('dotenv').config()
const connectdb=require('./config/db')
connectdb()
const authroutes=require('./routes/authroutes')
var cors = require('cors')
const cookieParser=require('cookie-parser')

// var corsOptions = {
//   origin: 'http://localhost:5173/',
//   optionsSuccessStatus: 200 
// }
const allowedOrigin = "https://e68-test-frontend.vercel.app";

app.use(cors({
  origin: allowedOrigin,
  credentials: true,             // Access-Control-Allow-Credentials: true
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With']
}));

// If you prefer to handle preflight explicitly:
app.options('*', cors({ origin: allowedOrigin, credentials: true }));

app.use(cookieParser())

app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Welcome to student managment system")
})
console.log("start")
app.use('/api/',authroutes)
app.listen(process.env.PORT,()=>{
    console.log(`listening at port ${process.env.PORT}`)
})
