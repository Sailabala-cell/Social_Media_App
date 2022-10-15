const router=require('express').Router()
const User = require("../models/User")
const bcrypt=require("bcrypt")

// Register
router.post("/register",async (req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10)
        const hashedpassword= await bcrypt.hash(req.body.password,salt)
    const user = 
    new User({
        username: req.body.username , 
        email:req.body.email,
        password:hashedpassword,
        city:req.body.city,
        relationship:req.body.relationship,
        from:req.body.from,
        desc:req.body.desc,

    })
         
        const newuser=  await user.save()
        res.status(200).json(newuser)
    }catch(err){
       res.status(500).json(err)
    }
   
})

// Login
router.post("/login", async (req,res)=>{
    try{
         const user1= await User.findOne({email:req.body.email})
         !user1 && res.status(404).json("user not found")
         const validPassword=await bcrypt.compare(req.body.password, user1.password)
         !validPassword && res.status(400).json("wrong passwprd") 
         
           res.status(200).json(user1)
    }catch(err){
           res.status(500).json(err)
    }
  
}

)

module.exports=router