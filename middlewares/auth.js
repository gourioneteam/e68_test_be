const jwt=require('jsonwebtoken')
require('dotenv').config()

exports.authuser=(req,res,next)=>{
    console.log("authuser middleware triggered")
    console.log("data: ",req.headers.authorization)
    const token=req.cookies?.token || req.headers.authorization?.split(' ')[1]
    console.log(token)
    if(!token){
        return res.status(400).json({message:"authetication required"})
    }
    try{
        const verified=jwt.verify(token,process.env.secretkey)
        req.user=verified
        console.log(req.user)
        next()
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.authorizeRoles=(...roles)=>{
console.log(roles)
return (req,res,next)=>{
    if(!req.user){
        return res.status(401).json({message:"please log in"})
    }
    if(!roles.includes(req.user.usertype)){
        return res.status(400).json({message:"Accessdeneid"})
    }
    next()
}
}
