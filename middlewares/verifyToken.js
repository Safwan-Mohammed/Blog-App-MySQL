const jwt = require('jsonwebtoken')

exports.authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){ 
        return res.status(401).json({message : "Invalid Token"});
    }

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, value) => {
        if(err) {
            return res.status(401).json({message : "Invalid Token"})
        }
        next()
    })
}