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
app.use(cors({
  origin: 'http://localhost:5173', // ✅ frontend URL (Vite default port)
  credentials: true                // ✅ allow cookies / tokens
}));
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
