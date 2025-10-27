const mongoose=require('mongoose')

const userschema=new mongoose.Schema({

    firstname:{type:String},
    lastname:{type:String},
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    usertype:{type:String,enum:['admin','student'],required:true}

})

const User=mongoose.model('User',userschema)

module.exports=User