const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const RefreshToken = require('../models/refreshToken')

exports.signUp = async(req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({email : req.body.email, password : hashedPassword})

        const accessToken = jwt.sign({email : req.body.email}, process.env.JWT_ACCESS_SECRET, {expiresIn : '1d'});
        const refreshToken = jwt.sign({email : req.body.email}, process.env.JWT_REFRESH_SECRET, {expiresIn : '7d'});

        await RefreshToken.create({email : req.body.email, token : refreshToken, expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})

        return res.status(200).json({
            email : req.body.email,
            accessToken : accessToken,
            refreshToken : refreshToken
        })
    }
    catch(error){
        return res.status(500).json({message : "Internal Server Error"})
    }
}

exports.signIn = async(req, res) => {
    try{
        const user = await User.findByPk(req.body.email)
        if(!user){
            return res.status(400).json({
                message : "User Doesn't exist! Please Sign Up!"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
            message: "Incorrect Password",
          });
        }

        const accessToken = jwt.sign({email : req.body.email}, process.env.JWT_ACCESS_SECRET, {expiresIn : '1d'});
        const refreshToken = jwt.sign({email : req.body.email}, process.env.JWT_REFRESH_SECRET, {expiresIn : '7d'});

        const oldUser = await RefreshToken.findByPk(req.body.email)        
        await oldUser.update({token : refreshToken, expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})

        return res.status(200).json({
            email : req.body.email,
            accessToken : accessToken,
            refreshToken : refreshToken
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

exports.refreshToken = async(req, res) => {
    const refreshToken = req.body.refreshToken
    try{
        const storedToken = await RefreshToken.findOne({ where : {token : refreshToken}})
        if(!storedToken || new Date(storedToken.expiryDate) < new Date() || storedToken.email != req.body.email){
            return res.status(400).json({
                message : `Invalid Refresh Token`
            })
        }
        const accessToken = jwt.sign({email : req.body.email}, process.env.JWT_ACCESS_SECRET, {expiresIn : '1d'});
        return res.status(200).json({
            accessToken : accessToken
        })
    }
    catch(error){
        return res.json(500).json({
            message : `Internal Server Error`
        })
    }
}

exports.signOut = async(req, res) => {
    if(req.body == {}){
        return res.sendStatus(500)
    }
    const refreshToken = req.body.refreshToken
    const email = req.body.email
    try{
        
        const response = await RefreshToken.destroy({ where : {token : refreshToken, email : email}})
        if(response){
            return res.status(200).json({
                message: "Logged Out Successfully!"
            })
        }  
        else{
            return res.status(500).json({
                message : "Internal Server Error"
            })
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}