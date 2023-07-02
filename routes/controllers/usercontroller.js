const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../../models/usermodel");
//@ desc Register the user
//@route POST /api/user/register
//@access public

const registerUser = asyncHandler(async (req,res)=>{
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("This user is already registered")
    }
    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);
    const newuser = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created.${newuser}`);
    if(newuser){
        res.status(201).json({_id: newuser.id, email: newuser.email})
    }else{
        res.status(400);
        throw new Error("User data is not valid!"); 
    }
    res.json({message:"Register the user"});
});


//@ desc Login the user
//@route POST /api/user/login
//@access public

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const newuser = await User.findOne({email});
    if(newuser && (await bcrypt.compare(password,newuser.password))){
        const accesswebToken = jwt.sign({
            user:{
                username: newuser.username,
                email: newuser.email,
                id: newuser.id
            },
        },process.env.ACCESS_TOKEN_SECERT,
        {expiresIn: '15m'});
        res.status(201).json({accesswebToken})
    }else{
        res.status(401)
        throw new Error("Invalid email and password.")
    }
    res.json({message:"login user"});
});


//@ desc Get the current user
//@route GET /api/user/current
//@access private

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
});

module.exports = {registerUser,loginUser,currentUser}