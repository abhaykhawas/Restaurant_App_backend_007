const express = require('express')
const jwt = require('jsonwebtoken')
const authRoutes = require('./Routes/authRoute')
const menuRoutes = require('./Routes/menuRoute')
const orderRoutes = require('./Routes/orderRoute')
const paymentRoutes = require('./Routes/paymentRoute')
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cors())

app.use(express.json())

app.use(cookieParser())


app.get('/', (req, res) => {
    console.log(req.cookies)
    let views = req.cookies?.views ? parseInt(req.cookies?.views) : 0
    views += 1
    res.cookie("views", views, {maxAge: 24 * 60 * 60 * 1000})
    res.status(200).json({
        success: true,
        message: "On root page",
        views
    })
})


app.use('/api/v1/auth', authRoutes)

app.use('/api/v1/menu', menuRoutes)

app.use('/api/v1/order', orderRoutes)

app.use('/api/v1/payment', paymentRoutes)
// app.get('/token', async (req, res) => {
//     let data = {
//         "email" : 'cool.com',
//         "age": 100
//     }

//     // Creating a jwt signature
//     const token = jwt.sign(data, 'mysecret', {expiresIn: '2m'})

//     res.status(200).json({token})
// })


// app.get('/token/:jwtToken', async (req, res) => {
//     try{
//         const {jwtToken} = req.params

//         const decoded = jwt.verify(jwtToken, 'mysecret')
//         res.status(200).json({
//             decoded
//         })
//     }
//     catch(err) {
//         res.status(400).json({
//             success: false,
//             message: err.message
//         })
//     }
// })

if (process.env.NODE_ENV !== 'test') {
    connectDB()
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`Server started at http://localhost:${port}`))
}

module.exports = app
