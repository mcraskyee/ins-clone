const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//注册用户
const registerUser = async (req, res) => {
  try{
    const {fullName, username, email, password} = req.body;
    //检查用户是否存在，如果存在，则注册失败，否则成功
    const existingUser = await User.findOne({username});
    if(existingUser){
      return res.status(400).json({message:'User already exists'});
    }
    //如果成功，加密密码, 创建用户
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName, 
      username, 
      email, 
      password:hashedPassword, 
      userID:username});
    console.log("user",user);
    await user.save();
    return res.status(201).json({
      message:'User registered successfully', userID:username
    });
  } catch(error){
    console.error("error registering user",error);
    return res.status(500).json({message:"Server Error"});
  }
};


//登录用户
const loginUser = async (req, res) => {
  try{
    const {username, password} = req.body; 
    //检查用户是否存在，如果不存在，则登录失败
    const user = await User.findByUsername(username);
    if(!user){
      return res.status(400).json({message:'User not found'});
    }

    //如果用户存在，用bcrypt检查密码是否正确，如果不正确，则登录失败
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(400).json({message:'Invalid password'});
    }

    //如果密码正确，生成token并返回
    const token = jwt.sign({userID:user._id}, "secretKey");
    return res.status(200).json({token, userID:username});
    
  } catch(error){
    console.error("error logging in user",error);
    return res.status(500).json({message:"Server Error"});
  }
};

module.exports = {registerUser, loginUser}