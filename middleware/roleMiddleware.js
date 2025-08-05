const adminOnly  = (req, res, next) => {
    if(req.user.role !== 'ADMIN') {
        return res.status(400).json({
            success:false,
            message: 'Admin Access only'
        })
    }

    next()
}

module.exports = { adminOnly }