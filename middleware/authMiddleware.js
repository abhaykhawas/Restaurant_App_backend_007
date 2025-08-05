const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    
    const token = req.headers['authorization'].split(' ')[1]

    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied'
        })
    }

    try{
        const decoded = jwt.verify(token, 'anewsecret')
        req.user = decoded
        next()
    }
    catch(err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }

}

module.exports = authMiddleware