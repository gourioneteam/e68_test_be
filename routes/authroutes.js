const express=require('express')
const router=express.Router()
const authcontroller=require('../controllers/authcontroller')
const auth=require('../middlewares/auth')
router.post('/register',authcontroller.createuser)
router.post('/login',authcontroller.loginUser)
router.get('/profile',auth.authuser,authcontroller.getprofile)
router.get('/admin/dashboard',auth.authuser,auth.authorizeRoles('admin'),
authcontroller.admindashboard
)

router.get('/common',auth.authuser,auth.authorizeRoles('admin','student'),
authcontroller.commondashboard
)

router.get('/student',auth.authuser,auth.authorizeRoles('student'),
authcontroller.studentdashboard
)
router.get('/logout',authcontroller.logoutuser)
module.exports=router