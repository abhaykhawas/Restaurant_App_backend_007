const Stripe = require('stripe')
const dotenv = require('dotenv')

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const createPaymentIntent = async (req, res) => {
    try{
        const { amount, currency } = req.body

        const  paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: { enabled: true }
        })

        res.json({
            clientSecret: paymentIntent.client_secret
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {createPaymentIntent}