const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');

// //user registration
// router.post('/signup',async(req,res)=>{
//     try {
//         const {fullName,email,password}=req.body;
//         const hashedPassword=await bcrypt.hash(password,10);
//         const user=await User.create({
//             fullName,
//             email,
//             password:hashedPassword,
//             subscriptionTier:'free',//set default tier to free
//         });
//         await user.save();
//         res.status(201).json({message:'User created successfully'});
//     } catch (error) {
//         res.status(500).json({message:'Something went wrong'});
//     }
// })
//user login
router.post('/login',async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:'Invalid credentials'});
        }
        const token=jwt.sign({userId:user._id},'secretKey',{expiresIn:'1h'});
        res.status(200).json({token,userId:user._id,subscriptionTier:user.subscriptionTier})
     console.log('Logged in successfully');
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
module.exports=router;
